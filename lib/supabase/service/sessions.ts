"use client"
import { createClient } from "../client"

const supabase = createClient()

export const startSession = async (siteId: string, sessionId: string) => {
    const { data, error } = await supabase
        .from("chat_sessions")
        .insert([{ site_id: siteId, session_id: sessionId }])
        .select()
        .single()
    if (error) throw error
    return data
}

export const endSession = async (sessionId: string) => {
    const { data, error } = await supabase
        .from("chat_sessions")
        .update({ ended_at: new Date().toISOString() })
        .eq("session_id", sessionId)
        .select()
        .single()
    if (error) throw error
    return data
}

export const fetchSessions = async (siteId: string) => {
    const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("site_id", siteId)
        .order("started_at", { ascending: false })
    if (error) throw error
    return data
}

export const logChat = async (
    siteId: string,
    sessionId: string,
    role: "user" | "bot",
    message: string,
    responseTimeMs?: number,
    tokensUsed?: number
) => {
    const { data, error } = await supabase
        .from("chat_logs")
        .insert([
            {
                site_id: siteId,
                session_id: sessionId,
                role,
                message,
                response_time_ms: responseTimeMs,
                tokens_used: tokensUsed,
            },
        ])
        .select()
        .single()

    if (error) throw error

    if (responseTimeMs) {
        await supabase.rpc("update_session_stats", {
            session_id_input: sessionId,
            response_time_input: responseTimeMs,
        })
    }

    return data
}

export const fetchSessionChatLogs = async (sessionId: string) => {
    const { data, error } = await supabase
        .from("chat_logs")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true })
    if (error) throw error
    return data
}

export const fetchLastSessionMessage = async (sessionId: string) => {
    const { data, error } = await supabase
        .from("chat_logs")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
    if (error) throw error
    return data
}

export const getRecentChats = async (siteId: string) => {
    const { data, error } = await supabase
        .from("chat_logs")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false })
        .limit(5)
    if (error) throw error
    return data || []
}
