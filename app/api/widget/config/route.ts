import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const siteId = searchParams.get("siteId")
  const token = searchParams.get("token")

  if (!siteId || !token) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    // Get site configuration
    const { data: site, error } = await supabase
      .from("sites")
      .select("id, title, description, theme, status, widget_token_hash")
      .eq("id", siteId)
      .eq("widget_token_hash", token)
      .eq("status", "ready")
      .single()

    if (error || !site) {
      return NextResponse.json({ error: "Site not found or not ready" }, { status: 404 })
    }

    // Return public configuration
    return NextResponse.json({
      id: site.id,
      title: site.title,
      description: site.description,
      theme: site.theme,
      status: site.status,
    })
  } catch (error) {
    console.error("Widget config error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
