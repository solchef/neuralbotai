// lib/supabase/service.ts
"use client"

import { createClient } from "./client"
import { redirect } from "next/navigation"
import { Membership } from "../auth/types"
import { Link, LinkStatus } from "@/store/useSiteLinksTrainingStore"

const supabase = createClient()

const validStatuses: LinkStatus[] = ["indexed", "pending", "failed", "no-space"]
const normalizeStatus = (status: string): LinkStatus =>
    validStatuses.includes(status as LinkStatus) ? (status as LinkStatus) : "pending"

export const SupabaseService = {
    getUser: async () => {

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (error) throw error
        return user
    },

    async logout() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    createTenant: async (name: string, owner_user_id: string) => {


        const { data, error } = await supabase
            .from("tenants")
            .insert({ name, owner_user_id })
            .select()
            .single()

        if (error) throw error
        return data
    },

    addMembership: async (tenant_id: string, user_id: string, role = "admin") => {


        const { error } = await supabase.from("memberships").insert({
            tenant_id,
            user_id,
            role,
            accepted_at: new Date().toISOString(),
        })

        if (error) throw error
    },

    getCurrentTenant: async () => {


        const user = await SupabaseService.getUser()
        console.log(user)
        if (!user) redirect("/login")

        const { data: members } = await supabase
            .from("memberships").select()

        console.log(members)

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
            // .not("accepted_at", "is", null)
            .single();
        console.log(membership)

        if (!membership) {
            redirect("/onboarding")
        }

        return {
            id: membership.tenant_id,
            name: membership.tenants.name,
            owner_user_id: membership.tenants.owner_user_id,
            plan: membership.tenants.plans,
            userRole: membership.role,
        }
    },

    async getSites(tenantId: string) {
        const { data, error } = await supabase
            .from("sites")
            .select("*")
            .eq("tenant_id", tenantId)
        if (error) throw error
        return data
    },

    async getUsage(tenantId: string) {
        const { data, error } = await supabase
            .from("usage")
            .select("queries_count")
            .eq("tenant_id", tenantId)
        if (error) throw error
        return data || []
    },

    async getTeamCount(tenantId: string) {
        const { count, error } = await supabase
            .from("memberships")
            .select("*", { count: "exact", head: true })
            .eq("tenant_id", tenantId)
        if (error) throw error
        return count || 0
    },

    async createSite(input: {
        tenantId: string
        title: string
        description?: string
        domain?: string
        crawlSettings?: {
            max_depth: number
            max_pages: number
            exclude_patterns: string[]
        }
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
                widget_token_hash: widgetToken, // later: hash it with SHA256
                crawl_settings: input.crawlSettings,
            })
            .select("*")
            .single()

        if (error) throw error
        return data
    },

    async updateSiteStatus(siteId: string, status: "pending" | "crawling" | "ready" | "error") {
        const { data, error } = await supabase
            .from("sites")
            .update({ status })
            .eq("id", siteId)
            .select()
            .single()

        if (error) throw error
        return data
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

    async getSiteById(siteId: string) {
        const { data, error } = await supabase
            .from("sites")
            .select("*")
            .eq("id", siteId)
            .single()
        if (error) throw error
        return data
    },

    async getRecentChats(siteId: string) {
        const { data, error } = await supabase
            .from("chat_logs")
            .select("*")
            .eq("site_id", siteId)
            .order("created_at", { ascending: false })
            .limit(5)
        if (error) throw error
        return data || []
    },

    async getUsageStats(siteId: string) {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const { data, error } = await supabase
            .from("usage")
            .select("*")
            .eq("site_id", siteId)
            .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
        if (error) throw error
        return data?.reduce((sum, d) => sum + d.queries_count, 0) || 0
    },

    //embeddid data

    async getTextEntries(siteId: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("text_training")
            .select("*")
            .eq("site_id", siteId)
            .order("created_at", { ascending: false })
        if (error) throw error
        return data
    },

    async addTextEntry(siteId: string, title: string, content: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("text_training")
            .insert([{ site_id: siteId, title, content }])
            .select()
            .single()
        if (error) throw error
        return data
    },

    async updateTextEntry(id: string, title: string, content: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("text_training")
            .update({ title, content, chars: content.length })
            .eq("id", id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async deleteTextEntry(id: string) {
        const supabase = createClient()
        const { error } = await supabase.from("text_training").delete().eq("id", id)
        if (error) throw error
        return true
    },


    //qa
    async getQATraining(siteId: string) {
        const { data, error } = await supabase
            .from("qa_training")
            .select("*")
            .eq("site_id", siteId)
            .order("created_at", { ascending: false })

        if (error) throw error
        return data
    },

    async addQATraining(siteId: string, question: string, answer: string) {
        const { data, error } = await supabase
            .from("qa_training")
            .insert([{ site_id: siteId, question, answer }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateQATraining(id: string, question: string, answer: string) {
        const { data, error } = await supabase
            .from("qa_training")
            .update({ question, answer, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    async deleteQATraining(id: string) {
        const { error } = await supabase.from("qa_training").delete().eq("id", id)
        if (error) throw error
    },

    async getLinks(siteId: string): Promise<Link[]> {
        const { data, error } = await supabase
            .from("links")
            .select("*")
            .eq("site_id", siteId)
            .order("created_at", { ascending: false })

        if (error) throw error

        // ✅ Map to typed Link[]
        return (data ?? []).map((row) => ({
            ...row,
            status: normalizeStatus(row.status),
        }))
    },


    async addLinks(siteId: string, urls: string[]) {
        const inserts = urls.map((url) => ({ site_id: siteId, url }))
        const { data, error } = await supabase.from("links").insert(inserts).select()
        if (error) throw error
        return data
    },

    async deleteLinks(ids: string[]) {
        const { error } = await supabase.from("links").delete().in("id", ids)
        if (error) throw error
        return true
    },

    async retrainLinks(ids: string[]) {
        // This is a placeholder – you’d probably call an RPC / function
        console.log("Retraining requested for:", ids)
        return true
    },



}



