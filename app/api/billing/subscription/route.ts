import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's profile and tenant
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get tenant subscription info
    const { data: tenant } = await supabase
      .from("tenants")
      .select("subscription_id, plan_name, plan_price, subscription_status")
      .eq("id", profile.id)
      .single()

    if (!tenant || !tenant.subscription_id) {
      return NextResponse.json({ subscription: null })
    }

    // In a real implementation, you would fetch from Stripe API
    // For now, return mock data based on tenant info
    const subscription = {
      id: tenant.subscription_id,
      name: tenant.plan_name,
      price: tenant.plan_price,
      interval: "month",
      status: tenant.subscription_status,
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      last4: "4242", // Mock card ending
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Subscription API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
