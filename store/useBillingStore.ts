// stores/billing-store.ts
import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface Plan {
    id: string
    name: string
    price_cents: number
    interval: string
    description?: string
    features: Record<string, any>
    popular: boolean
}

interface Usage {
    conversations: { used: number; limit: number }
    sites: { used: number; limit: number }
    teamMembers: { used: number; limit: number }
}

interface Invoice {
    id: string
    number: string
    created: string
    amount_paid: number
    status: string
    invoice_pdf?: string
}

interface CurrentPlan {
    id: string
    name: string
    price: number
    interval: string
    status: string
    current_period_end: string
    last4: string
}

interface BillingState {
    plans: Plan[]
    currentPlan: CurrentPlan | null
    usage: Usage | null
    invoices: Invoice[]
    loading: boolean
    error: string | null

    // Actions
    fetchBilling: (tenant_id: string) => Promise<void>
}

export const useBillingStore = create<BillingState>((set) => ({
    plans: [],
    currentPlan: null,
    usage: null,
    invoices: [],
    loading: false,
    error: null,

    fetchBilling: async (tenant_id: string) => {
        set({ loading: true, error: null })
        try {
            const [plans, currentPlan, usage, invoices] = await Promise.all([
                SupabaseService.getPlans(),
                SupabaseService.getCurrentPlan(tenant_id),
                SupabaseService.getUsage(tenant_id),
                SupabaseService.getInvoices(tenant_id),
            ])

            console.log(plans,
                currentPlan,
                usage,
                invoices,)

            set({
                plans,
                currentPlan,
                usage,
                invoices,
                loading: false,
            })
        } catch (err: any) {
            console.error("Billing fetch error:", err)
            set({ error: err.message || "Failed to fetch billing", loading: false })
        }
    },
}))
