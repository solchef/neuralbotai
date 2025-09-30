import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface ChatMessage {
    id: string
    sender: "user" | "bot"
    content: string
    timestamp: string
}

interface Session {
    sessionId: string
    siteId: string
    startedAt: string
    endedAt: string | null
    lastMessageAt: string
    lastMessage: string
    messageCount: number
    satisfaction?: "positive" | "neutral" | "negative" | null
}


interface ChatStore {
    sessions: Session[]
    sessionMessages: ChatMessage[]
    loading: boolean
    fetchSessions: (siteId: string) => Promise<void>
    fetchSessionMessages: (sessionId: string) => Promise<void>
    clearSessionMessages: () => void
    logMessage: (params: {
        sessionId: string
        siteId: string
        sender: "user" | "bot"
        content: string
        responseTimeMs?: number
        tokensUsed?: number
    }) => Promise<void>

}

/**
 * Expand logs into user/bot messages
 */
function transformLogsToMessages(logs: any[]): ChatMessage[] {
    const messages: ChatMessage[] = []

    logs.forEach((log) => {
        messages.push({
            id: log.id,
            sender: log.role,
            content: log.message,
            timestamp: log.created_at,
        })
    })

    return messages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
}

export const useChatStore = create<ChatStore>((set) => ({
    sessions: [],
    sessionMessages: [],
    loading: false,

    fetchSessions: async (siteId) => {
        set({ loading: true })
        try {
            const sessionsRaw = await SupabaseService.fetchSessions(siteId)

            const sessions: Session[] = await Promise.all(
                sessionsRaw.map(async (row: any) => {
                    const lastLog = await SupabaseService.fetchLastSessionMessage(row.session_id)
                    const feedback = await SupabaseService.fetchSessionFeedback(row.session_id)

                    let satisfaction: "positive" | "neutral" | "negative" | null = null
                    if (feedback && feedback.length > 0) {
                        const avgRating =
                            feedback.reduce((sum, f) => sum + (f.rating ?? 0), 0) /
                            feedback.length
                        if (avgRating >= 4) satisfaction = "positive"
                        else if (avgRating <= 2) satisfaction = "negative"
                        else satisfaction = "neutral"
                    }

                    return {
                        sessionId: row.session_id,
                        siteId: row.site_id,
                        startedAt: row.started_at,
                        endedAt: row.ended_at,
                        lastMessageAt: lastLog?.created_at ?? row.started_at,
                        lastMessage: lastLog?.message ?? "",
                        messageCount: row.total_messages ?? 0,
                        satisfaction,
                    }
                })
            )

            console.log("Fetched sessions:", sessions)

            set({
                sessions: sessions.sort(
                    (a, b) =>
                        new Date(b.lastMessageAt).getTime() -
                        new Date(a.lastMessageAt).getTime()
                ),
            })
        } finally {
            set({ loading: false })
        }
    },

    fetchSessionMessages: async (sessionId) => {
        set({ loading: true })
        try {
            const logs = await SupabaseService.fetchSessionChatLogs(sessionId)
            const messages = transformLogsToMessages(logs)
            //console.log("Fetched session messages:", messages)
            set({ sessionMessages: messages })
        } finally {
            set({ loading: false })
        }
    },

    clearSessionMessages: () => set({ sessionMessages: [] }),

    logMessage: async ({
        sessionId,
        siteId,
        sender,
        content,
        responseTimeMs,
        tokensUsed
    }: {
        sessionId: string
        siteId: string
        sender: "user" | "bot"
        content: string
        responseTimeMs?: number
        tokensUsed?: number
    }) => {
        // Optimistic UI update
        const newMessage: ChatMessage = {
            id: crypto.randomUUID(),
            sender,
            content,
            timestamp: new Date().toISOString(),
        }
        set((state) => ({
            sessionMessages: [...state.sessionMessages, newMessage],
        }))

        try {
            const logged = await SupabaseService.logChat(
                siteId,
                sessionId,
                sender,
                content,
                responseTimeMs,
                tokensUsed
            )

            // replace the optimistic message with the DB one (with real ID + timestamp)
            set((state) => ({
                sessionMessages: state.sessionMessages.map((m) =>
                    m.id === newMessage.id
                        ? {
                            id: logged.id,
                            sender: logged.role,
                            content: logged.message,
                            timestamp: logged.created_at,
                        }
                        : m
                ),
            }))
        } catch (err) {
            console.error("Failed to log chat:", err)
            // optional: rollback optimistic message
        }
    },

}))
