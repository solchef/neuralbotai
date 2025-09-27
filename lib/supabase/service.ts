// lib/supabase/service.ts
"use client"

import { createClient } from "./client"
import { redirect } from "next/navigation"
import { Membership } from "../auth/types"
import { Link, LinkStatus } from "@/store/useSiteLinksTrainingStore"
import { ChatbotTuning } from "../types/chatBotConfig"

const supabase = createClient()

// ✅ Normalize raw DB string into our strict union
const validStatuses: LinkStatus[] = ["indexed", "pending", "failed", "no-space"]
const normalizeStatus = (status: string): LinkStatus =>
    validStatuses.includes(status as LinkStatus) ? (status as LinkStatus) : "pending"

export type ChatbotConfig = {
    siteId: string
    title: string
    titleEnabled: boolean
    welcomeMessage: string
    welcomeEnabled: boolean
    primaryColor: string
    theme: "light" | "dark" | "auto"
    avatar: string
}

function mapFromDb(row: any): ChatbotConfig {
    return {
        siteId: row.site_id,
        title: row.title,
        titleEnabled: row.title_enabled,
        welcomeMessage: row.welcome_message,
        welcomeEnabled: row.welcome_enabled,
        primaryColor: row.primary_color,
        theme: row.theme,
        avatar: row.avatar,
    }
}


function mapToDb(values: Partial<ChatbotConfig>): any {
    const mapped: any = {}
    if (values.siteId !== undefined) mapped.site_id = values.siteId
    if (values.title !== undefined) mapped.title = values.title
    if (values.titleEnabled !== undefined) mapped.title_enabled = values.titleEnabled
    if (values.welcomeMessage !== undefined) mapped.welcome_message = values.welcomeMessage
    if (values.welcomeEnabled !== undefined) mapped.welcome_enabled = values.welcomeEnabled
    if (values.primaryColor !== undefined) mapped.primary_color = values.primaryColor
    if (values.theme !== undefined) mapped.theme = values.theme
    if (values.avatar !== undefined) mapped.avatar = values.avatar
    return mapped
}

const mapTuningToDb = (tuning: Partial<ChatbotTuning>) => ({
    bot_name: tuning.botName,
    bot_personality: tuning.botPersonality,
    system_prompt: tuning.systemPrompt,
    temperature: tuning.temperature,
    max_tokens: tuning.maxTokens,
    response_length: tuning.responseLength,
    language: tuning.language,
    fallback_enabled: tuning.fallbackEnabled,
    fallback_message: tuning.fallbackMessage,
    confidence_threshold: tuning.confidenceThreshold,
    context_window: tuning.contextWindow,
    enable_memory: tuning.enableMemory,
    enable_sentiment: tuning.enableSentiment,
    enable_moderation: tuning.enableModeration,
    enable_analytics: tuning.enableAnalytics,
})

function mapTuningFromDb(row: any): ChatbotTuning {
    return {
        siteId: row.site_id ?? "",
        botName: row.bot_name ?? "Neural Assistant",
        botPersonality: row.bot_personality ?? "professional",
        systemPrompt: row.system_prompt ?? "You are a helpful AI assistant. Be professional, friendly, and concise.",
        temperature: row.temperature ?? 0.7,
        maxTokens: row.max_tokens ?? 150,
        responseLength: row.response_length ?? "medium",
        language: row.language ?? "en",
        fallbackEnabled: row.fallback_enabled ?? true,
        fallbackMessage: row.fallback_message ?? "I'm sorry, I don't have enough information to answer that question. Would you like to speak with a human agent?",
        confidenceThreshold: row.confidence_threshold ?? 0.6,
        contextWindow: row.context_window ?? 5,
        enableMemory: row.enable_memory ?? true,
        enableSentiment: row.enable_sentiment ?? false,
        enableModeration: row.enable_moderation ?? true,
        enableAnalytics: row.enable_analytics ?? true,
    }
}


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
    // ---- LINKS ----
    async getLinks(siteId: string): Promise<Link[]> {
        const { data, error } = await supabase
            .from("links")
            .select("*")
            .eq("site_id", siteId)
            .order("created_at", { ascending: false })

        if (error) throw error

        return (data ?? []).map((row) => ({
            ...row,
            status: normalizeStatus(row.status),
        }))
    },

    async addLinks(siteId: string, urls: string[]): Promise<Link[]> {
        const inserts = urls.map((url) => ({ site_id: siteId, url, type: "link" }))
        const { data, error } = await supabase.from("links").insert(inserts).select("*")

        if (error) throw error

        return (data ?? []).map((row) => ({
            ...row,
            status: normalizeStatus(row.status),
        }))
    },

    async deleteLinks(ids: string[]): Promise<boolean> {
        const { error } = await supabase.from("links").delete().in("id", ids)
        if (error) throw error
        return true
    },

    async retrainLinks(ids: string[]): Promise<boolean> {
        // Here you could call a Supabase function instead
        console.log("Retraining requested for:", ids)
        return true
    },

    async uploadDocument(siteId: string, file: File): Promise<Link[]> {
        const filePath = `${siteId}/${Date.now()}-${file.name}`

        // 1. Upload file
        const { error: uploadError } = await supabase.storage
            .from("training_docs")
            .upload(filePath, file)

        if (uploadError) throw uploadError

        // 2. Get public URL
        const { data: urlData } = supabase.storage
            .from("training_docs")
            .getPublicUrl(filePath)

        // 3. Insert record in links table
        const { data, error: insertError } = await supabase
            .from("links")
            .insert({
                site_id: siteId,
                type: "doc",
                url: urlData.publicUrl,
                file_name: file.name,
                file_size: file.size,
                chars: 0,
                status: "pending",
            })
            .select("*")

        if (insertError) throw insertError

        // ✅ Return proper Link[]
        return (data ?? []).map((row) => ({
            ...row,
            status: normalizeStatus(row.status),
        }))
    },

    async getChatbotConfig(siteId: string): Promise<ChatbotConfig | null> {
        const { data, error } = await supabase
            .from("chatbot_configs")
            .select("*")
            .eq("site_id", siteId)
            .maybeSingle()

        if (error) throw error
        return data ? mapFromDb(data) : null
    },

    async saveChatbotConfig(siteId: string, values: Partial<ChatbotConfig>): Promise<ChatbotConfig> {
        const payload = mapToDb(values)
        const { data, error } = await supabase
            .from("chatbot_configs")
            .upsert({ site_id: siteId, ...payload }, { onConflict: "site_id" })
            .select()
            .single()

        if (error) throw error
        return mapFromDb(data)
    },
    async getChatbotTuning(siteId: string): Promise<ChatbotTuning> {
        const { data, error } = await supabase
            .from("chatbot_tuning")
            .select("*")
            .eq("site_id", siteId)
            .maybeSingle()

        if (error) throw error
        return mapTuningFromDb(data)
    },

    async saveChatbotTuning(
        siteId: string,
        values: Partial<ChatbotTuning>,
    ): Promise<ChatbotTuning> {
        const payload = mapTuningToDb(values)
        const { data, error } = await supabase
            .from("chatbot_tuning")
            .upsert({ site_id: siteId, ...payload }, { onConflict: "site_id" })
            .select()
            .single()

        if (error) throw error
        return mapTuningFromDB(data)
    },


}



