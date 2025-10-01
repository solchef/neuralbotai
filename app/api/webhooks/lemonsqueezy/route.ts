import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
    const rawBody = await req.text()
    const signature = req.headers.get("X-Signature") || ""

    // ✅ Verify webhook
    const hmac = crypto
        .createHmac("sha256", process.env.LEMON_WEBHOOK_SECRET!)
        .update(rawBody)
        .digest("hex")

    if (hmac !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const payload = JSON.parse(rawBody)
    const event = payload.meta.event_name
    const data = payload.data
    const attrs = data.attributes
    const meta = payload.meta

    const supabase = await createClient()

    if (event === "subscription_created" || event === "subscription_updated") {
        const variantId = attrs.variant_id
        const plan = await supabase
            .from("plans")
            .select("id")
            .eq("lemon_variant_id", variantId)
            .single()

        const tenantId = meta.custom_data.tenant_id

        // Update subscriptions table
        await supabase.from("subscriptions").upsert({
            provider: "lemonsqueezy",
            provider_subscription_id: data.id,
            plan_id: plan.data?.id,
            tenant_id: tenantId,
            status: attrs.status,
            trial_ends_at: attrs.trial_ends_at,
            current_period_start: attrs.current_period_start,
            current_period_end: attrs.current_period_end,
            cancel_at: attrs.cancelled_at,
            canceled_at: attrs.cancelled_at,
        })

        // Update tenant record
        if (tenantId) {
            await supabase
                .from("tenants")
                .update({
                    plan_id: plan.data?.id,
                    lemon_customer_id: attrs.customer_id,
                    lemon_subscription_id: data.id,
                    subscription_status: attrs.status,
                })
                .eq("id", tenantId)
        }
    }

    if (event === "order_created") {
        // console.log(meta.custom_data.tenant_id)
        await supabase.from("invoices").insert({
            tenant_id: meta.custom_data.tenant_id,
            lemon_invoice_id: data.id,
            amount_cents: attrs.total,
            status: attrs.status,
            provider: "lemonsqueezy",
        })
    }

    return NextResponse.json({ received: true })
}

