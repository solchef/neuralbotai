import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Membership } from "./types"

export async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return user
}

export async function getCurrentTenant() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: membership } = await supabase
    .from("memberships")
    .select(`
    tenant_id,
    role,
    tenants!inner (
      id,
      name,
      owner_user_id,
      plans!plan_id (
        id,
        name,
        monthly_queries,
        max_sites,
        max_team_members
      )
    )
  `)
    .eq("user_id", user?.id)
    .not("accepted_at", "is", null)
    .single() as { data: Membership }

  if (!membership) {
    redirect("/onboarding")
  }
  // console.log(membership)
  return {
    id: membership.tenant_id,
    name: membership.tenants.name,
    owner_user_id: membership.tenants.owner_user_id,
    plan: membership.tenants.plans, // now a single object, not array
    userRole: membership.role,
  }
}

