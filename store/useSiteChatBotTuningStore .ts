import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"
import { ChatbotTuning } from "@/lib/types/chatBotConfig"
import { DEFAULT_TUNING_CONFIG } from "@/lib/config/chatbot"

type ChatbotTuningState = {
    config: ChatbotTuning
    loading: boolean
    error: string | null
    fetchConfig: (siteId: string) => Promise<void>
    saveConfig: (siteId: string, values: Partial<ChatbotTuning>) => Promise<void>
}

export const useSiteChatBotTuningStore = create<ChatbotTuningState>((set) => ({
    config: DEFAULT_TUNING_CONFIG,
    loading: false,
    error: null,

    fetchConfig: async (siteId) => {
        set({ loading: true, error: null })
        try {
            const config = await SupabaseService.getChatbotTuning(siteId)
            set({ config: config ?? DEFAULT_TUNING_CONFIG }) // ← use default if null
        } catch (err: any) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    saveConfig: async (siteId, values) => {
        set({ loading: true, error: null })
        try {
            const config = await SupabaseService.saveChatbotTuning(siteId, values)
            set({ config: config ?? DEFAULT_TUNING_CONFIG }) // ← default fallback
        } catch (err: any) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },
}))