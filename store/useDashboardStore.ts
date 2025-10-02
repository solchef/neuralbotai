import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface UsageSummary {
    conversations: { used: number; limit: number }
    sites: { used: number; limit: number }
    teamMembers: { used: number; limit: number }
}

interface DashboardState {
    sites: any[]
    usage: UsageSummary | null
    isLoading: boolean
    error: string | null
    loadDashboard: (tenantId: string) => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
    sites: [],
    usage: null,
    isLoading: false,
    error: null,

    loadDashboard: async (tenantId) => {
        set({ isLoading: true, error: null })
        try {
            // 1️⃣ Load sites
            const sites = await SupabaseService.getSites(tenantId)

            // 2️⃣ Load aggregated usage + plan limits
            const usage = await SupabaseService.getUsage(tenantId)

            // 3️⃣ Set state
            set({
                sites,
                usage,
            })
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to load dashboard",
            })
        } finally {
            set({ isLoading: false })
        }
    },
}))
