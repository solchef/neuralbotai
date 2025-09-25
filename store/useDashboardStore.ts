import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface DashboardState {
    sites: any[]
    usage: number
    teamMembersCount: number
    isLoading: boolean
    error: string | null
    loadDashboard: (tenantId: string, planLimit: number) => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
    sites: [],
    usage: 0,
    teamMembersCount: 0,
    isLoading: false,
    error: null,

    loadDashboard: async (tenantId, planLimit) => {
        set({ isLoading: true, error: null })
        try {
            const sites = await SupabaseService.getSites(tenantId)
            const usageRows = await SupabaseService.getUsage(tenantId)
            const totalQueries = usageRows.reduce((sum, d) => sum + d.queries_count, 0)
            const teamMembersCount = await SupabaseService.getTeamCount(tenantId)

            set({ sites, usage: totalQueries, teamMembersCount })
        } catch (err) {
            set({ error: err instanceof Error ? err.message : "Failed to load dashboard" })
        } finally {
            set({ isLoading: false })
        }
    },
}))
