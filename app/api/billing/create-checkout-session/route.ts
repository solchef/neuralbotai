// import { type NextRequest, NextResponse } from "next/server"
// import { createServerClient } from "@/lib/supabase/server"

// export async function POST(request: NextRequest) {
//   try {
//     const supabase = await createServerClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { plan } = await request.json()

//     // Get user's profile and tenant
//     const { data: profile } = await supabase.from("profiles").select("tenant_id").eq("id", user.id).single()

//     if (!profile) {
//       return NextResponse.json({ error: "Profile not found" }, { status: 404 })
//     }

//     // Define plan pricing
//     const planPricing: Record<string, { price: number; priceId: string }> = {
//       Starter: { price: 29, priceId: "price_starter" },
//       Professional: { price: 99, priceId: "price_professional" },
//       Enterprise: { price: 299, priceId: "price_enterprise" },
//     }

//     const selectedPlan = planPricing[plan]
//     if (!selectedPlan) {
//       return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
//     }

//     // In a real implementation, you would create a Stripe checkout session here
//     // For now, return a mock URL that would redirect to a success page
//     const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing/success?plan=${plan}`

//     // Update tenant with new plan (in real implementation, this would happen after successful payment)
//     await supabase
//       .from("tenants")
//       .update({
//         plan_name: plan,
//         plan_price: selectedPlan.price,
//         subscription_status: "active",
//         subscription_id: `sub_mock_${Date.now()}`,
//       })
//       .eq("id", profile.tenant_id)

//     return NextResponse.json({ url: mockCheckoutUrl })
//   } catch (error) {
//     console.error("Checkout session API error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getCurrentTenant } from "@/lib/auth/server"

export async function POST(req: Request) {
  try {
    const { plan } = await req.json()
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const variantId = process.env[`LS_VARIANT_${plan.toUpperCase()}`]
    if (!variantId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

    const tenant = await getCurrentTenant();

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: { tenant_id: tenant.id },
            },
            product_options: {
              redirect_url: "http://localhost:3000/dashboard"
            },
          },
          relationships: {
            store: { data: { type: "stores", id: process.env.LEMON_STORE_ID } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      }),
    })


    const checkout = await response.json()
    console.log(checkout)

    if (!response.ok) {
      // console.error("LemonSqueezy API error:", checkout)
      return NextResponse.json({ error: checkout }, { status: response.status })
    }

    const url = checkout?.data?.attributes?.url
    return NextResponse.json({ url })
  } catch (err: any) {
    console.error("Checkout creation failed:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
