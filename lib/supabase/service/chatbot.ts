"use client"
import { ChatbotTuning } from "@/lib/types/chatBotConfig"
import { createClient } from "../client"

const supabase = createClient()

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

export const ChatbotService = {
    async getChatbotConfig(siteId: string) {
        const { data, error } = await supabase.from("chatbots").select("*").eq("site_id", siteId).single()
        if (error) throw error
        return data
    },

    async saveChatbotConfig(siteId: string, config: ChatbotConfig) {
        const { error } = await supabase.from("chatbots").upsert({ site_id: siteId, ...mapToDb(config) })
        if (error) throw error
    },

    async getChatbotTuning(siteId: string) {
        const { data, error } = await supabase.from("chatbot_tuning").select("*").eq("site_id", siteId).single()
        if (error) throw error
        return data
    },

    async saveChatbotTuning(siteId: string, tuning: any) {
        const { error } = await supabase.from("chatbot_tuning").upsert({ site_id: siteId, ...tuning })
        if (error) throw error
    },
}
