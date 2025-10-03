"use client"
import { createClient } from "../client"

const supabase = createClient()

export const getPlans = async () => {
    const { data, error } = await supabase.from("plans").select("*")
    if (error) throw error

    // Normalize plans
    // console.log(data)
    return (data || []).map((plan) => ({
        id: plan.id,
        name: plan.name,
        price_cents: plan.price_cents,
        interval: plan.interval,
        description: plan.description,
        features: plan.features || {}, // JSONB
        popular: plan.popular ?? false,
    }))
}

// ✅ Get the current plan for a tenant(subscription + plan + payment method)
export const getCurrentPlan = async (tenant_id: string) => {
    const { data, error } = await supabase
        .from("subscriptions")
        .select("*, plan:plans(*)")
        .eq("tenant_id", tenant_id)
        .maybeSingle()

    console.log(tenant_id, data)

    if (error) throw error
    if (!data) return null

    return {
        id: data.id,
        name: data.plan?.name,
        price: (data.plan?.price_cents ?? 0) / 100,
        interval: data.plan?.interval,
        status: data.status,
        current_period_end: data.current_period_end,
        last4: data.payment_method?.last4 ?? "0000",
    }
}

export const getInvoices = async (tenant_id: string) => {
    const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("tenant_id", tenant_id)
        .order("created_at", { ascending: false })

    if (error) throw error

    return (data || []).map((inv: any) => ({
        id: inv.id,
        number: inv.number ?? inv.id,
        created: inv.created_at,
        amount_paid: inv.amount_paid_cents,
        status: inv.status,
        invoice_pdf: inv.invoice_pdf_url,
    }))
}
