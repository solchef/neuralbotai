"use client"
import { createClient } from "../client"

const supabase = createClient()

export const FeedbackService = {
    async logFeedback(sessionId: string, rating: number, comment?: string) {
        const { error } = await supabase
            .from("feedback")
            .insert({ session_id: sessionId, rating, comment })
        if (error) throw error
    },

    async fetchFeedback(siteId: string) {
        const { data, error } = await supabase.from("feedback").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async fetchSessionFeedback(sessionId: string) {
        const { data, error } = await supabase.from("feedback").select("*").eq("session_id", sessionId)
        if (error) throw error
        return data
    },
}
