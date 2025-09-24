export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          role: "user" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          role?: "user" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          role?: "user" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
      tenants: {
        Row: {
          id: string
          owner_user_id: string
          name: string
          plan_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: "active" | "canceled" | "past_due" | "unpaid"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_user_id: string
          name: string
          plan_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: "active" | "canceled" | "past_due" | "unpaid"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_user_id?: string
          name?: string
          plan_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: "active" | "canceled" | "past_due" | "unpaid"
          created_at?: string
          updated_at?: string
        }
      }
      sites: {
        Row: {
          id: string
          tenant_id: string
          domain: string | null
          title: string
          description: string | null
          status: "pending" | "crawling" | "ready" | "error"
          ingest_last_run: string | null
          ingest_next_run: string | null
          ingest_frequency: "manual" | "daily" | "weekly" | "monthly"
          widget_token_hash: string | null
          theme: any
          crawl_settings: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          domain?: string | null
          title: string
          description?: string | null
          status?: "pending" | "crawling" | "ready" | "error"
          ingest_last_run?: string | null
          ingest_next_run?: string | null
          ingest_frequency?: "manual" | "daily" | "weekly" | "monthly"
          widget_token_hash?: string | null
          theme?: any
          crawl_settings?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          domain?: string | null
          title?: string
          description?: string | null
          status?: "pending" | "crawling" | "ready" | "error"
          ingest_last_run?: string | null
          ingest_next_run?: string | null
          ingest_frequency?: "manual" | "daily" | "weekly" | "monthly"
          widget_token_hash?: string | null
          theme?: any
          crawl_settings?: any
          created_at?: string
          updated_at?: string
        }
      }
      chat_logs: {
        Row: {
          id: string
          site_id: string
          session_id: string | null
          user_message: string
          bot_response: string
          response_time_ms: number | null
          tokens_used: number | null
          metadata: any
          created_at: string
        }
        Insert: {
          id?: string
          site_id: string
          session_id?: string | null
          user_message: string
          bot_response: string
          response_time_ms?: number | null
          tokens_used?: number | null
          metadata?: any
          created_at?: string
        }
        Update: {
          id?: string
          site_id?: string
          session_id?: string | null
          user_message?: string
          bot_response?: string
          response_time_ms?: number | null
          tokens_used?: number | null
          metadata?: any
          created_at?: string
        }
      }
    }
  }
}
