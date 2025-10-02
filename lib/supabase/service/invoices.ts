"use client"
import { createClient } from "../client"

const supabase = createClient()

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
