// store/useOrganizationStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { SupabaseService } from "@/lib/supabase/service"

interface OrganizationState {
    tenant: any | null
    setTenant: (tenant: any) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    error: string | null
    setError: (error: string | null) => void
    organizationName: string
    setOrganizationName: (name: string) => void
    createTenant: (organizationName: string) => Promise<any | null>
    loadTenant: () => Promise<any | null>
}

export const useOrganizationStore = create(
    persist<OrganizationState>(
        (set) => ({
            tenant: null,
            setTenant: (tenant) => set({ tenant }),
            isLoading: false,
            setIsLoading: (loading) => set({ isLoading: loading }),
            error: null,
            setError: (error) => set({ error }),
            organizationName: "",
            setOrganizationName: (name) => set({ organizationName: name }),

            createTenant: async (organizationName) => {
                set({ isLoading: true, error: null })
                try {
                    const user = await SupabaseService.getUser()
                    if (!user) throw new Error("You must be signed in")

                    const tenant = await SupabaseService.createTenant(organizationName, user.id)
                    await SupabaseService.addMembership(tenant.id, user.id)

                    set({ tenant })
                    return tenant
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "An error occurred" })
                    return null
                } finally {
                    set({ isLoading: false })
                }
            },

            loadTenant: async () => {
                set({ isLoading: true })
                try {
                    console.log("loading")
                    const tenantData = await SupabaseService.getCurrentTenant()
                    set({ tenant: tenantData })
                    return tenantData
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Failed to load tenant" })
                    return null
                } finally {
                    set({ isLoading: false })
                }
            },
        }),
        { name: "organization-store" }
    )
)
