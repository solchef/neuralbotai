import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const supabase = await createClient()

  try {
    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user has access to this site
    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select(
        `
        *,
        tenants!inner (
          id,
          memberships!inner (
            user_id,
            role
          )
        )
      `,
      )
      .eq("id", id)
      .eq("tenants.memberships.user_id", user.id)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 })
    }

    // Check if user has editor or admin role
    const userRole = site.tenants.memberships[0]?.role
    if (!["admin", "editor"].includes(userRole)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Update site status to crawling
    await supabase.from("sites").update({ status: "crawling", ingest_last_run: new Date().toISOString() }).eq("id", id)

    // In a real implementation, you would:
    // 1. Queue a background job to crawl the website
    // 2. Extract and process content
    // 3. Generate embeddings using OpenAI or similar
    // 4. Store vectors in the database
    // 5. Update site status to "ready" when complete

    // For now, we'll simulate the process
    setTimeout(async () => {
      const supabase = await createClient()
      await supabase.from("sites").update({ status: "ready" }).eq("id", id)
    }, 5000)

    return NextResponse.json({ message: "Ingestion started successfully" })
  } catch (error) {
    console.error("Ingestion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
