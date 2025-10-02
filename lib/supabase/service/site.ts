"use client"
import { createClient } from "../client"

const supabase = createClient()

export const SiteService = {
    async getSites(tenantId: string) {
        const { data, error } = await supabase
            .from("sites")
            .select("*")
            .eq("tenant_id", tenantId)
        if (error) throw error
        return data
    },

    async createSite(input: {
        tenantId: string
        title: string
        description?: string
        domain?: string
        crawlSettings?: { max_depth: number; max_pages: number; exclude_patterns: string[] }
    }) {
        const widgetToken = crypto.randomUUID()
        const { data, error } = await supabase
            .from("sites")
            .insert({
                tenant_id: input.tenantId,
                title: input.title,
                description: input.description || null,
                domain: input.domain || null,
                status: "pending",
                widget_token_hash: widgetToken,
                crawl_settings: input.crawlSettings,
            })
            .select("*")
            .single()

        if (error) throw error
        return data
    },

    async updateSiteStatus(siteId: string, status: string) {
        const { error } = await supabase
            .from("sites")
            .update({ status })
            .eq("id", siteId)
        if (error) throw error
    },

    async getSiteById(siteId: string) {
        const { data, error } = await supabase.from("sites").select("*").eq("id", siteId).single()
        if (error) throw error
        return data
    },

    async getTeamCount(tenantId: string) {
        const { count, error } = await supabase
            .from("memberships")
            .select("id", { count: "exact" })
            .eq("tenant_id", tenantId)
        if (error) throw error
        return count || 0
    },
}
