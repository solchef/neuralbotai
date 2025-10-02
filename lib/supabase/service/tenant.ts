"use client"
import { Membership } from "@/lib/auth/types"
import { createClient } from "../client"
import { redirect } from "next/navigation"
import { getUser } from "./auth"
const supabase = createClient()

export const createTenant = async (name: string, owner_user_id: string) => {
    const { data, error } = await supabase
        .from("tenants")
        .insert({ name, owner_user_id })
        .select()
        .single()

    if (error) throw error
    return data
}

export const addMembership = async (tenant_id: string, user_id: string, role = "admin") => {
    const { error } = await supabase.from("memberships").insert({
        tenant_id,
        user_id,
        role,
        accepted_at: new Date().toISOString(),
    })

    if (error) throw error
}

export const getCurrentTenant = async () => {
    const user = await getUser()
    if (!user) redirect("/login")

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
        .single() as { data: Membership }

    if (!membership) redirect("/onboarding")

    return {
        id: membership.tenant_id,
        name: membership.tenants.name,
        owner_user_id: membership.tenants.owner_user_id,
        plan: membership.tenants.plans,
        userRole: membership.role,
    }
}

export const getTenantForUser = async (userId: string) => {
    const { data, error } = await supabase
        .from("memberships")
        .select("tenant_id")
        .eq("user_id", userId)
        .single()

    if (error) throw error
    return data?.tenant_id
}
