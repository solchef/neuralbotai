import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { plan } = await request.json()

    // Get user's profile and tenant
    const { data: profile } = await supabase.from("profiles").select("tenant_id").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Define plan pricing
    const planPricing: Record<string, { price: number; priceId: string }> = {
      Starter: { price: 29, priceId: "price_starter" },
      Professional: { price: 99, priceId: "price_professional" },
      Enterprise: { price: 299, priceId: "price_enterprise" },
    }

    const selectedPlan = planPricing[plan]
    if (!selectedPlan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // In a real implementation, you would create a Stripe checkout session here
    // For now, return a mock URL that would redirect to a success page
    const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing/success?plan=${plan}`

    // Update tenant with new plan (in real implementation, this would happen after successful payment)
    await supabase
      .from("tenants")
      .update({
        plan_name: plan,
        plan_price: selectedPlan.price,
        subscription_status: "active",
        subscription_id: `sub_mock_${Date.now()}`,
      })
      .eq("id", profile.tenant_id)

    return NextResponse.json({ url: mockCheckoutUrl })
  } catch (error) {
    console.error("Checkout session API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
