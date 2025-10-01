import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's profile and tenant
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get current month's usage
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    // Count conversations this month
    const { count: conversationsCount } = await supabase
      .from("chat_logs")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", profile.id)
      .gte("created_at", startOfMonth.toISOString())

    // Count active sites
    const { count: sitesCount } = await supabase
      .from("sites")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", profile.id)
      .eq("status", "active")

    // Count team members
    const { count: teamMembersCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", profile.id)

    // Get tenant plan limits
    const { data: tenant } = await supabase.from("tenants").select("plan_name").eq("id", profile.id).single()

    // Define plan limits
    const planLimits: Record<string, any> = {
      Starter: { conversations: 1000, sites: 1, teamMembers: 2 },
      Professional: { conversations: 10000, sites: 5, teamMembers: 10 },
      Enterprise: { conversations: 100000, sites: -1, teamMembers: -1 },
    }

    const limits = planLimits[tenant?.plan_name || "Starter"] || planLimits.Starter

    const usage = {
      conversations: {
        used: conversationsCount || 0,
        limit: limits.conversations,
      },
      sites: {
        used: sitesCount || 0,
        limit: limits.sites,
      },
      teamMembers: {
        used: teamMembersCount || 0,
        limit: limits.teamMembers,
      },
    }

    return NextResponse.json(usage)
  } catch (error) {
    console.error("Usage API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
