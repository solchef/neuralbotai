"use client"
import { Membership } from "@/lib/auth/types"
import { createClient } from "../client"
import { redirect } from "next/navigation"

const supabase = createClient()

export const TenantService = {
    async createTenant(name: string, owner_user_id: string) {
        const { data, error } = await supabase
            .from("tenants")
            .insert({ name, owner_user_id })
            .select()
            .single()
        if (error) throw error
        return data
    },

    async addMembership(tenant_id: string, user_id: string, role = "admin") {
        const { error } = await supabase.from("memberships").insert({
            tenant_id,
            user_id,
            role,
            accepted_at: new Date().toISOString(),
        })
        if (error) throw error
    },

    async getCurrentTenant() {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) redirect("/login")

        const { data } = await supabase
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
            .eq("user_id", user.id)
            .single() as { data: Membership }

        if (!data) redirect("/onboarding")

        return {
            id: data.tenant_id,
            name: data.tenants.name,
            owner_user_id: data.tenants.owner_user_id,
            plan: data.tenants.plans,
            userRole: data.role,
        }
    },

    async getTenantForUser(userId: string) {
        const { data, error } = await supabase
            .from("memberships")
            .select("tenant_id")
            .eq("user_id", userId)
            .single()
        if (error) throw error
        return data?.tenant_id
    },
}
