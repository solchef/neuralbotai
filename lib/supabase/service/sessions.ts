"use client"
import { createClient } from "../client"

const supabase = createClient()

export const SessionsService = {
    async startSession(siteId: string, userId: string) {
        const { data, error } = await supabase
            .from("sessions")
            .insert({ site_id: siteId, user_id: userId })
            .select()
            .single()
        if (error) throw error
        return data
    },

    async endSession(sessionId: string) {
        const { error } = await supabase.from("sessions").update({ ended_at: new Date().toISOString() }).eq("id", sessionId)
        if (error) throw error
    },

    async fetchSessions(siteId: string) {
        const { data, error } = await supabase.from("sessions").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async logChat(sessionId: string, message: string, role: string) {
        const { error } = await supabase.from("chat_logs").insert({ session_id: sessionId, message, role })
        if (error) throw error
    },

    async fetchSessionChatLogs(sessionId: string) {
        const { data, error } = await supabase.from("chat_logs").select("*").eq("session_id", sessionId)
        if (error) throw error
        return data
    },

    async fetchLastSessionMessage(sessionId: string) {
        const { data, error } = await supabase
            .from("chat_logs")
            .select("*")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()
        if (error) throw error
        return data
    },
}
