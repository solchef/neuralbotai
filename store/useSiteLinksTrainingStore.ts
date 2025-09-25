"use client"

import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

export type LinkStatus = "indexed" | "pending" | "failed" | "no-space"

export interface Link {
    id: string
    site_id: string
    url: string
    title: string | null
    description: string | null
    image: string | null
    chars: number
    status: LinkStatus
    created_at: string
}

interface CrawlStats {
    crawledLinks: number
    totalChars: number
    maxChars: number
    indexed: number
    pending: number
    failed: number
    noSpace: number
}

interface LinkState {
    links: Link[]
    stats: CrawlStats
    loading: boolean
    fetchLinks: (siteId: string) => Promise<void>
    addLinks: (siteId: string, urls: string[]) => Promise<void>
    deleteLinks: (ids: string[]) => Promise<void>
    retrainLinks: (ids: string[]) => Promise<void>
}

// normalize raw DB status -> LinkStatus
const validStatuses: LinkStatus[] = ["indexed", "pending", "failed", "no-space"]
const normalizeStatus = (status: string): LinkStatus =>
    validStatuses.includes(status as LinkStatus) ? (status as LinkStatus) : "pending"

export const useSiteLinksTrainingStore = create<LinkState>((set, get) => ({
    links: [],
    stats: {
        crawledLinks: 0,
        totalChars: 0,
        maxChars: 500_000,
        indexed: 0,
        pending: 0,
        failed: 0,
        noSpace: 0,
    },
    loading: false,

    fetchLinks: async (siteId) => {
        set({ loading: true })
        const rawLinks = await SupabaseService.getLinks(siteId)

        // 🔑 map raw DB rows into typed Link[]
        const links: Link[] = rawLinks.map((l) => ({
            ...l,
            status: normalizeStatus(l.status),
        }))

        const stats: CrawlStats = {
            crawledLinks: links.length,
            totalChars: links.reduce((sum, l) => sum + (l.chars || 0), 0),
            maxChars: get().stats.maxChars,
            indexed: links.filter((l) => l.status === "indexed").length,
            pending: links.filter((l) => l.status === "pending").length,
            failed: links.filter((l) => l.status === "failed").length,
            noSpace: links.filter((l) => l.status === "no-space").length,
        }

        set({ links, stats, loading: false })
    },

    addLinks: async (siteId, urls) => {
        const rawLinks = await SupabaseService.addLinks(siteId, urls)

        const newLinks: Link[] = rawLinks.map((l) => ({
            ...l,
            status: normalizeStatus(l.status),
        }))

        const links = [...newLinks, ...get().links]

        const stats: CrawlStats = {
            crawledLinks: links.length,
            totalChars: links.reduce((sum, l) => sum + (l.chars || 0), 0),
            maxChars: get().stats.maxChars,
            indexed: links.filter((l) => l.status === "indexed").length,
            pending: links.filter((l) => l.status === "pending").length,
            failed: links.filter((l) => l.status === "failed").length,
            noSpace: links.filter((l) => l.status === "no-space").length,
        }

        set({ links, stats })
    },

    deleteLinks: async (ids) => {
        await SupabaseService.deleteLinks(ids)
        const links = get().links.filter((l) => !ids.includes(l.id))

        const stats: CrawlStats = {
            crawledLinks: links.length,
            totalChars: links.reduce((sum, l) => sum + (l.chars || 0), 0),
            maxChars: get().stats.maxChars,
            indexed: links.filter((l) => l.status === "indexed").length,
            pending: links.filter((l) => l.status === "pending").length,
            failed: links.filter((l) => l.status === "failed").length,
            noSpace: links.filter((l) => l.status === "no-space").length,
        }

        set({ links, stats })
    },

    retrainLinks: async (ids) => {
        await SupabaseService.retrainLinks(ids)

        // Optimistic update
        const links = get().links.map((l) =>
            ids.includes(l.id) ? { ...l, status: "pending" } : l
        )

        const stats: CrawlStats = {
            crawledLinks: links.length,
            totalChars: links.reduce((sum, l) => sum + (l.chars || 0), 0),
            maxChars: get().stats.maxChars,
            indexed: links.filter((l) => l.status === "indexed").length,
            pending: links.filter((l) => l.status === "pending").length,
            failed: links.filter((l) => l.status === "failed").length,
            noSpace: links.filter((l) => l.status === "no-space").length,
        }

        // set({ links, stats })
    },
}))
