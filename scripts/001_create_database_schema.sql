-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Subscription plans
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  monthly_queries INTEGER DEFAULT 0,
  features JSONB DEFAULT '{}',
  price_cents INTEGER DEFAULT 0,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default plans
INSERT INTO public.plans (name, monthly_queries, price_cents, features, stripe_price_id) VALUES
('Free', 100, 0, '{"sites": 1, "team_members": 1, "analytics": true}', null),
('Pro', 5000, 2900, '{"sites": 5, "team_members": 5, "analytics": true, "integrations": true}', null),
('Business', 50000, 9900, '{"sites": 25, "team_members": 25, "analytics": true, "integrations": true, "white_label": true}', null);

-- Tenants (organizations)
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  plan_id UUID REFERENCES public.plans(id) DEFAULT (SELECT id FROM public.plans WHERE name = 'Free' LIMIT 1),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'unpaid')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on tenants
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Tenants policies
CREATE POLICY "tenants_select_member" ON public.tenants FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = tenants.id AND user_id = auth.uid()
  ) OR owner_user_id = auth.uid()
);

CREATE POLICY "tenants_update_owner" ON public.tenants FOR UPDATE USING (owner_user_id = auth.uid());
CREATE POLICY "tenants_delete_owner" ON public.tenants FOR DELETE USING (owner_user_id = auth.uid());

-- Memberships (team members)
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by UUID REFERENCES public.profiles(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- Enable RLS on memberships
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Memberships policies
CREATE POLICY "memberships_select_member" ON public.memberships FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = tenant_id AND owner_user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.memberships m2 
    WHERE m2.tenant_id = memberships.tenant_id AND m2.user_id = auth.uid() AND m2.role IN ('admin', 'editor')
  )
);

CREATE POLICY "memberships_insert_admin" ON public.memberships FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = tenant_id AND owner_user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.memberships m2 
    WHERE m2.tenant_id = memberships.tenant_id AND m2.user_id = auth.uid() AND m2.role = 'admin'
  )
);

-- Sites
CREATE TABLE IF NOT EXISTS public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  domain TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'crawling', 'ready', 'error')),
  ingest_last_run TIMESTAMPTZ,
  ingest_next_run TIMESTAMPTZ,
  ingest_frequency TEXT DEFAULT 'manual' CHECK (ingest_frequency IN ('manual', 'daily', 'weekly', 'monthly')),
  widget_token_hash TEXT UNIQUE,
  theme JSONB DEFAULT '{"primary_color": "#000000", "welcome_message": "How can I help you today?"}',
  crawl_settings JSONB DEFAULT '{"max_depth": 3, "max_pages": 100, "exclude_patterns": []}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on sites
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Sites policies
CREATE POLICY "sites_select_member" ON public.sites FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = sites.tenant_id AND user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = sites.tenant_id AND owner_user_id = auth.uid()
  )
);

CREATE POLICY "sites_insert_editor" ON public.sites FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = sites.tenant_id AND user_id = auth.uid() AND role IN ('admin', 'editor')
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = sites.tenant_id AND owner_user_id = auth.uid()
  )
);

CREATE POLICY "sites_update_editor" ON public.sites FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = sites.tenant_id AND user_id = auth.uid() AND role IN ('admin', 'editor')
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = sites.tenant_id AND owner_user_id = auth.uid()
  )
);

-- Vector embeddings (requires pgvector extension)
CREATE TABLE IF NOT EXISTS public.vectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on vectors
ALTER TABLE public.vectors ENABLE ROW LEVEL SECURITY;

-- Vectors policies (inherit from sites)
CREATE POLICY "vectors_select_member" ON public.vectors FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.sites s
    JOIN public.memberships m ON s.tenant_id = m.tenant_id
    WHERE s.id = vectors.site_id AND m.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.sites s
    JOIN public.tenants t ON s.tenant_id = t.id
    WHERE s.id = vectors.site_id AND t.owner_user_id = auth.uid()
  )
);

-- API keys
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  scopes TEXT[] DEFAULT ARRAY['chat', 'ingest'],
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on api_keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- API keys policies
CREATE POLICY "api_keys_select_admin" ON public.api_keys FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = api_keys.tenant_id AND user_id = auth.uid() AND role = 'admin'
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = api_keys.tenant_id AND owner_user_id = auth.uid()
  )
);

-- Usage tracking
CREATE TABLE IF NOT EXISTS public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  queries_count INTEGER DEFAULT 0,
  tokens_used BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, site_id, date)
);

-- Enable RLS on usage
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Usage policies
CREATE POLICY "usage_select_member" ON public.usage FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = usage.tenant_id AND user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = usage.tenant_id AND owner_user_id = auth.uid()
  )
);

-- Invoices
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_id TEXT UNIQUE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')),
  invoice_pdf TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Invoices policies
CREATE POLICY "invoices_select_admin" ON public.invoices FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = invoices.tenant_id AND user_id = auth.uid() AND role = 'admin'
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = invoices.tenant_id AND owner_user_id = auth.uid()
  )
);

-- Chat logs
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  session_id TEXT,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  response_time_ms INTEGER,
  tokens_used INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on chat_logs
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Chat logs policies
CREATE POLICY "chat_logs_select_member" ON public.chat_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.sites s
    JOIN public.memberships m ON s.tenant_id = m.tenant_id
    WHERE s.id = chat_logs.site_id AND m.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.sites s
    JOIN public.tenants t ON s.tenant_id = t.id
    WHERE s.id = chat_logs.site_id AND t.owner_user_id = auth.uid()
  )
);

-- Audit logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs policies
CREATE POLICY "audit_logs_select_admin" ON public.audit_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.memberships 
    WHERE tenant_id = audit_logs.tenant_id AND user_id = auth.uid() AND role = 'admin'
  ) OR
  EXISTS (
    SELECT 1 FROM public.tenants 
    WHERE id = audit_logs.tenant_id AND owner_user_id = auth.uid()
  )
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_memberships_tenant_user ON public.memberships(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_sites_tenant ON public.sites(tenant_id);
CREATE INDEX IF NOT EXISTS idx_vectors_site ON public.vectors(site_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_site ON public.chat_logs(site_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON public.chat_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_tenant_date ON public.usage(tenant_id, date);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON public.audit_logs(tenant_id);

-- Create vector similarity search index
CREATE INDEX IF NOT EXISTS idx_vectors_embedding ON public.vectors USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
