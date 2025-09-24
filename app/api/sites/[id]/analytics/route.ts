import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const siteId = params.id
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "7d"

    // Verify user has access to this site
    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("id, tenant_id")
      .eq("id", siteId)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 })
    }

    // Check if user belongs to the tenant
    const { data: profile } = await supabase.from("profiles").select("tenant_id").eq("id", user.id).single()

    if (!profile || profile.tenant_id !== site.tenant_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Calculate date range
    const now = new Date()
    const startDate = new Date()

    switch (range) {
      case "24h":
        startDate.setHours(now.getHours() - 24)
        break
      case "7d":
        startDate.setDate(now.getDate() - 7)
        break
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
      case "90d":
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Fetch conversation analytics
    const { data: conversations, error: conversationsError } = await supabase
      .from("conversations")
      .select(`
        id,
        created_at,
        user_id,
        satisfaction_rating,
        messages (
          id,
          created_at,
          response_time
        )
      `)
      .eq("site_id", siteId)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true })

    if (conversationsError) {
      console.error("Error fetching conversations:", conversationsError)
      return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }

    // Process analytics data
    const totalConversations = conversations?.length || 0
    const uniqueVisitors = new Set(conversations?.map((c) => c.user_id)).size

    // Calculate average response time
    const allMessages = conversations?.flatMap((c) => c.messages) || []
    const avgResponseTime =
      allMessages.length > 0
        ? allMessages.reduce((sum, msg) => sum + (msg.response_time || 0), 0) / allMessages.length
        : 0

    // Calculate satisfaction rate
    const ratingsCount = conversations?.filter((c) => c.satisfaction_rating !== null).length || 0
    const positiveRatings =
      conversations?.filter((c) => c.satisfaction_rating && c.satisfaction_rating >= 4).length || 0
    const satisfactionRate = ratingsCount > 0 ? (positiveRatings / ratingsCount) * 100 : 0

    // Group conversations by date for trends
    const conversationsByDate =
      conversations?.reduce((acc: any, conv) => {
        const date = new Date(conv.created_at).toISOString().split("T")[0]
        if (!acc[date]) {
          acc[date] = { conversations: 0, messages: 0 }
        }
        acc[date].conversations += 1
        acc[date].messages += conv.messages.length
        return acc
      }, {}) || {}

    const analytics = {
      summary: {
        totalConversations,
        uniqueVisitors,
        avgResponseTime: Math.round(avgResponseTime * 100) / 100,
        satisfactionRate: Math.round(satisfactionRate * 100) / 100,
      },
      trends: Object.entries(conversationsByDate).map(([date, data]: [string, any]) => ({
        date,
        conversations: data.conversations,
        messages: data.messages,
      })),
      satisfaction: {
        veryPositive: conversations?.filter((c) => c.satisfaction_rating === 5).length || 0,
        positive: conversations?.filter((c) => c.satisfaction_rating === 4).length || 0,
        neutral: conversations?.filter((c) => c.satisfaction_rating === 3).length || 0,
        negative: conversations?.filter((c) => c.satisfaction_rating && c.satisfaction_rating < 3).length || 0,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
