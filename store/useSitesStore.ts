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
        ingestType: "links" | "documents"
        linkType?: string
        linkValue?: string
        domain?: string
        maxDepth?: string
        maxPages?: string
        excludePatterns?: string
        files?: FileList | null
    }) => Promise<string | null>

    fetchSiteData: (siteId: string) => Promise<void>
    ingestSite: (siteId: string) => Promise<void>
}

export const useSitesStore = create<SitesState>((set, get) => ({
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

            // 1️⃣ Create the site
            const site = await SupabaseService.createSite({
                tenantId,
                title: input.title,
                description: input.description,
                domain: input.linkType === "fullWebsite" ? input.linkValue : undefined,
                crawlSettings:
                    input.linkType === "fullWebsite"
                        ? {
                            max_depth: parseInt(input.maxDepth || "3"),
                            max_pages: parseInt(input.maxPages || "100"),
                            exclude_patterns: input.excludePatterns
                                ? input.excludePatterns
                                    .split("\n")
                                    .map((p) => p.trim())
                                    .filter(Boolean)
                                : [],
                        }
                        : undefined,
            })

            // 2️⃣ Map linkType -> DB type
            if (
                input.ingestType === "links" &&
                input.linkType &&
                input.linkType !== "fullWebsite" &&
                input.linkValue
            ) {
                type LinkDBType =
                    | "link"
                    | "doc"
                    | "webpage"
                    | "youtube"
                    | "sitemap"
                    | "freshdesk"
                    | "pdf"
                    | "word"
                    | "excel"

                let dbType: LinkDBType = "link"

                switch (input.linkType) {
                    case "webpage":
                        dbType = "webpage"
                        break
                    case "youtube":
                        dbType = "youtube"
                        break
                    case "sitemap":
                        dbType = "sitemap"
                        break
                    case "freshdesk":
                        dbType = "freshdesk"
                        break
                    case "pdf":
                        dbType = "pdf"
                        break
                    case "word":
                        dbType = "word"
                        break
                    case "excel":
                        dbType = "excel"
                        break
                    default:
                        dbType = "link"
                }

                await SupabaseService.link.createLink({
                    siteId: site.id,
                    type: dbType,
                    url: input.linkValue,
                })
            }

            // 3️⃣ Document uploads (files go through uploadDocument)
            if (input.ingestType === "documents" && input.files?.length) {
                for (const file of Array.from(input.files)) {
                    await SupabaseService.uploadDocument(site.id, file)
                }
            }

            // 4️⃣ Website crawl → mark status crawling
            if (input.ingestType === "links" && input.linkType === "fullWebsite") {
                await SupabaseService.updateSiteStatus(site.id, "crawling")
            }

            return site.id
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Error creating site",
            })
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

    ingestSite: async (siteId) => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetch(`/api/sites/${siteId}/ingest`, {
                method: "POST",
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to start ingestion")

            // Optimistic update: set status to crawling immediately
            const site = get().site
            if (site) {
                set({ site: { ...site, status: "crawling" } })
            }
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Error ingesting site",
            })
        } finally {
            set({ isLoading: false })
        }
    },
}))
