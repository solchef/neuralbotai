-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.api_keys (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid,
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  scopes ARRAY DEFAULT ARRAY['chat'::text, 'ingest'::text],
  last_used_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT api_keys_pkey PRIMARY KEY (id),
  CONSTRAINT api_keys_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id)
);
CREATE TABLE public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid,
  user_id uuid,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
  CONSTRAINT audit_logs_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.chat_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL,
  session_id text NOT NULL,
  message_id uuid,
  success boolean,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT chat_feedback_pkey PRIMARY KEY (id),
  CONSTRAINT chat_feedback_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id),
  CONSTRAINT chat_feedback_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.chat_logs(id)
);
CREATE TABLE public.chat_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL,
  session_id text NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'bot'::text])),
  message text NOT NULL,
  response_time_ms integer,
  tokens_used integer,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT chat_logs_pkey PRIMARY KEY (id),
  CONSTRAINT chat_logs_site_id_fkey1 FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.chat_logs_old (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid,
  session_id text,
  user_message text NOT NULL,
  bot_response text NOT NULL,
  response_time_ms integer,
  tokens_used integer,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  success boolean,
  CONSTRAINT chat_logs_old_pkey PRIMARY KEY (id),
  CONSTRAINT chat_logs_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.chat_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL,
  session_id text NOT NULL UNIQUE,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  total_messages integer DEFAULT 0,
  avg_response_time_ms numeric DEFAULT 0,
  CONSTRAINT chat_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT chat_sessions_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.chatbot_configs (
  site_id uuid NOT NULL,
  title text,
  title_enabled boolean DEFAULT true,
  welcome_message text,
  welcome_enabled boolean DEFAULT true,
  welcome_popup boolean DEFAULT false,
  primary_color text DEFAULT '#10b981'::text,
  position text DEFAULT 'bottom-right'::text,
  theme text DEFAULT 'light'::text,
  avatar text DEFAULT 'default'::text,
  custom_css text,
  CONSTRAINT chatbot_configs_pkey PRIMARY KEY (site_id),
  CONSTRAINT chatbot_configs_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.chatbot_tuning (
  site_id uuid NOT NULL,
  bot_name text NOT NULL DEFAULT 'Neural Assistant'::text,
  bot_personality text NOT NULL DEFAULT 'professional'::text,
  system_prompt text NOT NULL,
  temperature numeric NOT NULL DEFAULT 0.7,
  max_tokens integer NOT NULL DEFAULT 150,
  response_length text NOT NULL DEFAULT 'medium'::text,
  language text NOT NULL DEFAULT 'en'::text,
  fallback_enabled boolean NOT NULL DEFAULT true,
  fallback_message text,
  confidence_threshold numeric NOT NULL DEFAULT 0.6,
  context_window integer NOT NULL DEFAULT 5,
  enable_memory boolean NOT NULL DEFAULT true,
  enable_sentiment boolean NOT NULL DEFAULT false,
  enable_moderation boolean NOT NULL DEFAULT true,
  enable_analytics boolean NOT NULL DEFAULT true,
  CONSTRAINT chatbot_tuning_pkey PRIMARY KEY (site_id),
  CONSTRAINT chatbot_tuning_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.embeddings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_id uuid NOT NULL,
  vector ARRAY NOT NULL,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT embeddings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.invoices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  stripe_id text UNIQUE,
  tenant_id uuid,
  amount_cents integer NOT NULL,
  status text NOT NULL CHECK (status = ANY (ARRAY['draft'::text, 'open'::text, 'paid'::text, 'void'::text, 'uncollectible'::text])),
  invoice_pdf text,
  created_at timestamp with time zone DEFAULT now(),
  lemon_invoice_id text,
  provider text DEFAULT 'lemonsqueezy'::text CHECK (provider = ANY (ARRAY['stripe'::text, 'lemonsqueezy'::text])),
  CONSTRAINT invoices_pkey PRIMARY KEY (id),
  CONSTRAINT invoices_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id)
);
CREATE TABLE public.links (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  site_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['link'::text, 'doc'::text])),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'indexed'::text, 'failed'::text, 'no-space'::text])),
  url text NOT NULL,
  title text,
  description text,
  image text,
  chars integer DEFAULT 0,
  file_name text,
  file_size integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT links_pkey PRIMARY KEY (id),
  CONSTRAINT links_training_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.memberships (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid,
  user_id uuid,
  role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'editor'::text, 'viewer'::text])),
  invited_by uuid,
  invited_at timestamp with time zone DEFAULT now(),
  accepted_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT memberships_pkey PRIMARY KEY (id),
  CONSTRAINT memberships_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT memberships_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.plans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  monthly_queries integer DEFAULT 0,
  features jsonb DEFAULT '{}'::jsonb,
  price_cents integer DEFAULT 0,
  stripe_price_id text,
  created_at timestamp with time zone DEFAULT now(),
  max_sites integer DEFAULT 1,
  max_team_members integer DEFAULT 1,
  lemon_variant_id text,
  CONSTRAINT plans_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  name text,
  role text DEFAULT 'user'::text CHECK (role = ANY (ARRAY['user'::text, 'admin'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.qa_training (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['indexed'::text, 'pending'::text, 'failed'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT qa_training_pkey PRIMARY KEY (id),
  CONSTRAINT qa_training_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.sites (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid,
  domain text,
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'crawling'::text, 'ready'::text, 'error'::text])),
  ingest_last_run timestamp with time zone,
  ingest_next_run timestamp with time zone,
  ingest_frequency text DEFAULT 'manual'::text CHECK (ingest_frequency = ANY (ARRAY['manual'::text, 'daily'::text, 'weekly'::text, 'monthly'::text])),
  widget_token_hash text UNIQUE,
  theme jsonb DEFAULT '{"primary_color": "#000000", "welcome_message": "How can I help you today?"}'::jsonb,
  crawl_settings jsonb DEFAULT '{"max_depth": 3, "max_pages": 100, "exclude_patterns": []}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sites_pkey PRIMARY KEY (id),
  CONSTRAINT sites_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id)
);
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL,
  provider text NOT NULL CHECK (provider = ANY (ARRAY['stripe'::text, 'lemonsqueezy'::text])),
  provider_subscription_id text NOT NULL,
  plan_id uuid,
  status text NOT NULL CHECK (status = ANY (ARRAY['active'::text, 'canceled'::text, 'past_due'::text, 'unpaid'::text, 'trialing'::text])),
  trial_ends_at timestamp with time zone,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);
CREATE TABLE public.tenants (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_user_id uuid,
  name text NOT NULL,
  plan_id uuid,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text DEFAULT 'active'::text CHECK (subscription_status = ANY (ARRAY['active'::text, 'canceled'::text, 'past_due'::text, 'unpaid'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  lemon_customer_id text,
  lemon_subscription_id text,
  billing_provider text DEFAULT 'lemonsqueezy'::text CHECK (billing_provider = ANY (ARRAY['stripe'::text, 'lemonsqueezy'::text])),
  CONSTRAINT tenants_pkey PRIMARY KEY (id),
  CONSTRAINT tenants_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.profiles(id),
  CONSTRAINT tenants_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);
CREATE TABLE public.text_training (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL,
  title text,
  content text NOT NULL,
  chars integer DEFAULT char_length(content),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['indexed'::text, 'pending'::text, 'failed'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT text_training_pkey PRIMARY KEY (id),
  CONSTRAINT text_training_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.usage (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tenant_id uuid,
  site_id uuid,
  date date NOT NULL,
  queries_count integer DEFAULT 0,
  tokens_used bigint DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT usage_pkey PRIMARY KEY (id),
  CONSTRAINT usage_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT usage_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);
CREATE TABLE public.vectors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  site_id uuid,
  url text DEFAULT ''::text,
  title text,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding USER-DEFINED,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vectors_pkey PRIMARY KEY (id),
  CONSTRAINT vectors_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.sites(id)
);