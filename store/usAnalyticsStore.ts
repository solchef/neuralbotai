import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface ConversationData {
    date: string
    conversations: number
    messages: number
}

interface Totals {
    totalConversations: number
    totalMessages: number
    avgResponseTime: number
    satisfactionRate: number
}

interface TopQuestion {
    text: string
    count: number
}

interface FeedbackEntry {
    feedback: boolean | null
    created_at: string
    text: string | null
}

interface Analytics {
    conversationData: ConversationData[]
    totals: Totals
    topQuestions: TopQuestion[]
    recentFeedback: FeedbackEntry[]
}

interface AnalyticsState {
    analytics: Analytics | null
    loading: boolean
    error: string | null
    loadAnalytics: (siteId: string, timeRange?: string) => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    analytics: null,
    loading: false,
    error: null,

    loadAnalytics: async (siteId, timeRange = "7d") => {
        set({ loading: true, error: null })
        try {
            const analyticsRaw = await SupabaseService.fetchAnalytics(siteId, timeRange)

            const analytics: Analytics = {
                conversationData: analyticsRaw.conversationData ?? [],
                totals: analyticsRaw.totals,
                topQuestions: analyticsRaw.topQuestions ?? [],
                recentFeedback: analyticsRaw.recentFeedback ?? [],
            }

            set({ analytics, loading: false })
        } catch (err: any) {
            set({ error: err.message, loading: false })
        }
    },
}))
