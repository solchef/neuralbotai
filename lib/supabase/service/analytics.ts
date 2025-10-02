"use client"
import { createClient } from "../client"

const supabase = createClient()

export const AnalyticsService = {
    async fetchAnalytics(siteId: string) {
        const { data, error } = await supabase.rpc("get_site_analytics", { site_id: siteId })
        if (error) throw error
        return data
    },
}
