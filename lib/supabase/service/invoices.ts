"use client"
import { createClient } from "../client"

const supabase = createClient()

export const InvoicesService = {
    async getInvoices(tenantId: string) {
        const { data, error } = await supabase.from("invoices").select("*").eq("tenant_id", tenantId)
        if (error) throw error
        return data
    },
}
