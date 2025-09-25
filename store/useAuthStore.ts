import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface AuthState {
    user: any | null
    tenant: any | null
    isLoading: boolean
    error: string | null
    loadUserAndTenant: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    tenant: null,
    isLoading: false,
    error: null,

    loadUserAndTenant: async () => {
        set({ isLoading: true, error: null })
        try {
            const user = await SupabaseService.getUser()
            if (!user) throw new Error("Not authenticated")

            const tenant = await SupabaseService.getCurrentTenant()
            set({ user, tenant })
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to load session",
                user: null,
                tenant: null,
            })
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        await SupabaseService.logout()
        set({ user: null, tenant: null })
    },
}))
