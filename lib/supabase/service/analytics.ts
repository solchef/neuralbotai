"use client"
import { createClient } from "../client"
import { getRangeDate } from "@/lib/utils"
const supabase = createClient()

export const fetchAnalytics = async (siteId: string, timeRange = "7d") => {
    const startDate = getRangeDate(timeRange)

    const { data: sessions, error: sessionErr } = await supabase
        .from("chat_sessions")
        .select("session_id, started_at, total_messages, avg_response_time_ms")
        .eq("site_id", siteId)
        .gte("started_at", startDate)
    if (sessionErr) throw sessionErr

    const convMap: Record<string, { conversations: number; messages: number }> = {}
    sessions.forEach((s) => {
        const date = s.started_at.split("T")[0]
        if (!convMap[date]) convMap[date] = { conversations: 0, messages: 0 }
        convMap[date].conversations++
        convMap[date].messages += s.total_messages || 0
    })

    const conversationData = Object.entries(convMap).map(([date, val]) => ({
        date,
        conversations: val.conversations,
        messages: val.messages,
    }))

    const totalConversations = sessions.length
    const totalMessages = sessions.reduce((sum, s) => sum + (s.total_messages || 0), 0)
    const avgResponseTime =
        sessions.length > 0
            ? sessions.reduce((sum, s) => sum + (s.avg_response_time_ms || 0), 0) / sessions.length
            : 0

    const { data: feedback } = await supabase
        .from("chat_feedback")
        .select("success, created_at, comment")
        .eq("site_id", siteId)
        .gte("created_at", startDate)

    const successCount = feedback?.filter((f) => f.success)?.length || 0
    const satisfactionRate =
        feedback && feedback.length > 0 ? Math.round((successCount / feedback.length) * 100) : 0

    const { data: logs } = await supabase
        .from("chat_logs")
        .select("message")
        .eq("site_id", siteId)
        .eq("role", "user")
        .gte("created_at", startDate)

    const questionCount: Record<string, number> = {}
    logs?.forEach((l) => {
        const text = l.message.trim()
        questionCount[text] = (questionCount[text] || 0) + 1
    })

    const topQuestions = Object.entries(questionCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([text, count]) => ({ text, count }))

    const recentFeedback = feedback
        ?.filter((f) => f.success !== null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .map((f) => ({
            feedback: f.success,
            created_at: f.created_at,
            text: f.comment,
        }))

    return {
        conversationData,
        totals: {
            totalConversations,
            totalMessages,
            avgResponseTime,
            satisfactionRate,
        },
        topQuestions,
        recentFeedback,
    }
}
