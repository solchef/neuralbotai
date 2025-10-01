// stores/billing-store.ts
import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface Plan {
    id: string
    name: string
    price_cents: number
    features: string[]
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
    invoice_pdf: string
}

interface BillingState {
    currentPlan: any | null
    usage: Usage | null
    invoices: Invoice[]
    plans: Plan[]
    loading: boolean
    fetchBillingData: (tenant_id: string) => Promise<void>
    fetchPlans: () => Promise<void>
}

export const useBillingStore = create<BillingState>((set) => ({
    currentPlan: null,
    usage: null,
    invoices: [],
    plans: [],
    loading: true,

    fetchBillingData: async (tenant_id) => {
        set({ loading: true })
        try {
            const [plan, usage, invoices] = await Promise.all([
                SupabaseService.getCurrentPlan(),
                SupabaseService.getUsage(tenant_id),
                SupabaseService.getInvoices(),
            ])

            set({
                currentPlan: plan,
                usage,
                invoices,
                loading: false,
            })
        } catch (e) {
            console.error("Failed to fetch billing data:", e)
            set({ loading: false })
        }
    },

    fetchPlans: async () => {
        try {
            const plans: Plan[] = await SupabaseService.getPlans()
            set({ plans })
        } catch (e) {
            console.error("Failed to fetch plans:", e)
        }
    },
}))
