// store/useSiteTextTrainingStore.ts
import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface TextEntry {
    id: string
    site_id: string
    title: string
    content: string
    chars: number
    created_at: string
    updated_at: string
}

interface SitesState {
    site: any | null
    textEntries: TextEntry[]
    isLoading: boolean
    error: string | null

    fetchTextEntries: (siteId: string) => Promise<void>
    addTextEntry: (siteId: string, title: string, content: string) => Promise<void>
    updateTextEntry: (id: string, title: string, content: string) => Promise<void>
    deleteTextEntry: (id: string) => Promise<void>
}

export const useSiteTextTrainingStore = create<SitesState>((set, get) => ({
    site: null,
    textEntries: [],
    isLoading: false,
    error: null,

    fetchTextEntries: async (siteId) => {
        set({ isLoading: true })
        const entries = await SupabaseService.text.getTextEntries(siteId)
        set({ textEntries: entries, isLoading: false })
    },

    addTextEntry: async (siteId, title, content) => {
        const chars = content.length
        const newEntry = await SupabaseService.text.addTextEntry(siteId, title, content, chars)
        set({ textEntries: [...get().textEntries, newEntry] })
    },

    updateTextEntry: async (id, title, content) => {
        const updated = await SupabaseService.text.updateTextEntry(id, title, content)
        set({
            textEntries: get().textEntries.map((t) => (t.id === id ? updated : t)),
        })
    },

    deleteTextEntry: async (id) => {
        await SupabaseService.text.deleteTextEntry(id)
        set({
            textEntries: get().textEntries.filter((t) => t.id !== id),
        })
    },
}))
