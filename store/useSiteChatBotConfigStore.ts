import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"
import { DEFAULT_CHATBOT_CONFIG } from "@/lib/config/chatbot"
import { ChatbotConfig } from "@/lib/types/chatBotConfig"

type ChatbotConfigState = {
    config: ChatbotConfig | null
    loading: boolean
    error: string | null
    fetchConfig: (siteId: string) => Promise<void>
    saveConfig: (siteId: string, values: Partial<ChatbotConfig>) => Promise<void>
}

export const useSiteChatBotConfigStore = create<ChatbotConfigState>((set) => ({
    config: null,
    loading: false,
    error: null,

    fetchConfig: async (siteId) => {
        set({ loading: true, error: null })
        try {
            const config = await SupabaseService.getChatbotConfig(siteId)
            if (config) {
                set({ config })
            } else {
                // fallback to defaults
                set({ config: { ...DEFAULT_CHATBOT_CONFIG, siteId } })
            }
        } catch (err: any) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    saveConfig: async (siteId, values) => {
        set({ loading: true, error: null })
        try {
            const config = await SupabaseService.saveChatbotConfig(siteId, values)
            set({ config })
        } catch (err: any) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },
}))

