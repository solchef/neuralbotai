

"use client"
import { TenantWithPlan } from "@/lib/types"
import { createClient } from "../client"

const supabase = createClient()

export const getPlans = async () => {
    const { data, error } = await supabase.from("plans").select("*")
    if (error) throw error

    // Normalize plans
    return (data || []).map((plan) => ({
        id: plan.id,
        name: plan.name,
        price_cents: plan.price_cents,
        interval: plan.interval,
        description: plan.description,
        features: plan.features || {}, // JSONB
        popular: plan.popular ?? false,
    }))
}

// ✅ Get the current plan for a tenant (subscription + plan + payment method)
export const getCurrentPlan = async (tenant_id: string) => {
    const { data, error } = await supabase
        .from("subscriptions")
        .select("*, plan:plans(*)")
        .eq("tenant_id", tenant_id)
        .maybeSingle()

    // console.log(data)

    if (error) throw error
    if (!data) return null

    return {
        id: data.id,
        name: data.plan?.name,
        price: (data.plan?.price_cents ?? 0) / 100,
        interval: data.plan?.interval,
        status: data.status,
        current_period_end: data.current_period_end,
        last4: data.payment_method?.last4 ?? "0000",
    }
}


export const getUsage = async (tenant_id: string) => {
    const { data: usageAgg, error: usageError } = await supabase
        .from("usage")
        .select("queries_count, site_id")
        .eq("tenant_id", tenant_id)

    if (usageError) throw usageError
    if (!usageAgg) return null

    const conversationsUsed = usageAgg.reduce((sum, row) => sum + (row.queries_count || 0), 0)
    const sitesUsed = new Set(usageAgg.map((row) => row.site_id)).size

    const { count: teamMembersUsed, error: teamError } = await supabase
        .from("memberships")
        .select("id", { count: "exact", head: true })
        .eq("tenant_id", tenant_id)

    if (teamError) throw teamError

    const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .select("plan_id, plans!inner(max_messages, max_sites, max_team_members)")
        .eq("id", tenant_id)
        .single<TenantWithPlan>()

    if (tenantError) throw tenantError
    if (!tenant?.plans) return null

    const planLimits = tenant.plans

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
}

export const getUsageStats = async (siteId: string) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const { data, error } = await supabase
        .from("usage")
        .select("*")
        .eq("site_id", siteId)

    if (error) throw error
    return data?.reduce((sum, d) => sum + d.queries_count, 0) || 0
}

export const getTeamCount = async (tenantId: string) => {
    const { count, error } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("tenant_id", tenantId)
    if (error) throw error
    return count || 0
}

