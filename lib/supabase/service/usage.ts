"use client"
import { TenantWithPlan } from "@/lib/types"
import { createClient } from "../client"

const supabase = createClient()

export const UsageService = {
    async getUsageStats(siteId: string) {
        const { data, error } = await supabase.from("usage").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async getUsage(tenant_id: string) {
        // 1️⃣ Aggregate usage for tenant
        const { data: usageAgg, error: usageError } = await supabase
            .from("usage")
            .select("queries_count, site_id")
            .eq("tenant_id", tenant_id)

        if (usageError) throw usageError
        if (!usageAgg) return null

        // sum queries
        const conversationsUsed = usageAgg.reduce((sum, row) => sum + (row.queries_count || 0), 0)
        const sitesUsed = new Set(usageAgg.map((row) => row.site_id)).size

        // 2️⃣ Count team members separately (assuming you have a memberships table)
        const { count: teamMembersUsed, error: teamError } = await supabase
            .from("memberships")
            .select("id", { count: "exact", head: true })
            .eq("tenant_id", tenant_id)

        if (teamError) throw teamError

        // 3️⃣ Fetch plan limits
        const { data: tenant, error: tenantError } = await supabase
            .from("tenants")
            .select("plan_id, plans!inner(max_messages, max_sites, max_team_members)")
            .eq("id", tenant_id)
            .single<TenantWithPlan>()

        // console.log(tenant)

        if (tenantError) throw tenantError
        if (!tenant?.plans) return null


        const planLimits = tenant.plans
        // console.log("Plan limits:", planLimits)


        return {
            conversations: {
                used: conversationsUsed,
                limit: planLimits.max_messages,
            },
            sites: {
                used: sitesUsed,
                limit: planLimits.max_sites,
            },
            teamMembers: {
                used: teamMembersUsed || 0,
                limit: planLimits.max_team_members,
            },
        }
    },
}
