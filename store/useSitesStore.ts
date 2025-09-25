import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface SitesState {
    isLoading: boolean
    error: string | null

    site: any | null
    recentChats: any[]
    totalQueries: number

    createSite: (input: {
        title: string
        description?: string
        domain?: string
        ingestType: "website" | "documents"
        maxDepth: string
        maxPages: string
        excludePatterns: string
        files?: FileList | null
    }) => Promise<string | null>

    fetchSiteData: (siteId: string) => Promise<void>
}

export const useSitesStore = create<SitesState>((set) => ({
    isLoading: false,
    error: null,
    site: null,
    recentChats: [],
    totalQueries: 0,

    createSite: async (input) => {
        set({ isLoading: true, error: null })
        try {
            const user = await SupabaseService.getUser()
            if (!user) throw new Error("Not authenticated")

            const tenantId = await SupabaseService.getTenantForUser(user.id)
            if (!tenantId) throw new Error("No tenant found")

            const site = await SupabaseService.createSite({
                tenantId,
                title: input.title,
                description: input.description,
                domain: input.domain,
                crawlSettings: {
                    max_depth: parseInt(input.maxDepth),
                    max_pages: parseInt(input.maxPages),
                    exclude_patterns: input.excludePatterns
                        .split("\n")
                        .map((p) => p.trim())
                        .filter(Boolean),
                },
            })

            if (input.ingestType === "documents" && input.files?.length) {
                console.log("TODO: Upload documents to storage", input.files)
            }

            if (input.ingestType === "website" && input.domain) {
                await SupabaseService.updateSiteStatus(site.id, "crawling")
            }

            return site.id
        } catch (err) {
            set({ error: err instanceof Error ? err.message : "Error creating site" })
            return null
        } finally {
            set({ isLoading: false })
        }
    },

    fetchSiteData: async (siteId) => {
        set({ isLoading: true, error: null })
        try {
            const site = await SupabaseService.getSiteById(siteId)
            const recentChats = await SupabaseService.getRecentChats(siteId)
            const totalQueries = await SupabaseService.getUsageStats(siteId)

            set({ site, recentChats, totalQueries })
        } catch (err) {
            set({
                error:
                    err instanceof Error ? err.message : "Error fetching site details",
            })
        } finally {
            set({ isLoading: false })
        }
    },
}))
