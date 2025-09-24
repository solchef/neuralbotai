import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { siteId, token, message, sessionId } = body

  if (!siteId || !token || !message || !sessionId) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    // Verify site and token
    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("id, title, tenant_id, widget_token_hash, status")
      .eq("id", siteId)
      .eq("widget_token_hash", token)
      .eq("status", "ready")
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found or not ready" }, { status: 404 })
    }

    // In a real implementation, you would:
    // 1. Retrieve relevant content from the vector database
    // 2. Generate a response using OpenAI or similar AI service
    // 3. Apply any custom instructions or personality
    // 4. Handle conversation context and memory

    // For now, we'll return a simple response
    const responses = [
      "I'm here to help! What would you like to know?",
      "That's a great question. Let me help you with that.",
      "I'd be happy to assist you. Can you provide more details?",
      "Thanks for reaching out! How can I support you today?",
      "I understand you're looking for information. What specifically can I help with?",
    ]

    const botResponse = responses[Math.floor(Math.random() * responses.length)]

    // Log the conversation
    await supabase.from("chat_logs").insert({
      site_id: siteId,
      session_id: sessionId,
      user_message: message,
      bot_response: botResponse,
      created_at: new Date().toISOString(),
    })

    // Update usage statistics
    const today = new Date().toISOString().split("T")[0]
    const { data: existingUsage } = await supabase
      .from("usage")
      .select("queries_count")
      .eq("tenant_id", site.tenant_id)
      .eq("site_id", siteId)
      .eq("date", today)
      .single()

    if (existingUsage) {
      await supabase
        .from("usage")
        .update({ queries_count: existingUsage.queries_count + 1 })
        .eq("tenant_id", site.tenant_id)
        .eq("site_id", siteId)
        .eq("date", today)
    } else {
      await supabase.from("usage").insert({
        tenant_id: site.tenant_id,
        site_id: siteId,
        date: today,
        queries_count: 1,
      })
    }

    return NextResponse.json({
      response: botResponse,
      sessionId,
    })
  } catch (error) {
    console.error("Widget chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
