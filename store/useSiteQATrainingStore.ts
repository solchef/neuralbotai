import { create } from "zustand"
import { SupabaseService } from "@/lib/supabase/service"

interface QAItem {
    id: string
    question: string
    answer: string
    category: string
    dateAdded: string
    lastModified: string
}

interface TrainingState {
    qa: QAItem[]
    loading: boolean
    fetchQA: (siteId: string) => Promise<void>
    addQA: (siteId: string, q: string, a: string) => Promise<void>
    editQA: (id: string, q: string, a: string) => Promise<void>
    deleteQA: (id: string) => Promise<void>
}

export const useSiteQATrainingStore = create<TrainingState>((set, get) => ({
    qa: [],
    loading: false,

    fetchQA: async (siteId) => {
        set({ loading: true })
        const data = await SupabaseService.getQATraining(siteId)
        set({ qa: data ?? [], loading: false })
    },

    addQA: async (siteId, question, answer) => {
        const newItem = await SupabaseService.addQATraining(siteId, question, answer)
        set({ qa: [...get().qa, newItem] })
    },

    editQA: async (id, question, answer) => {
        const updated = await SupabaseService.updateQATraining(id, question, answer)
        set({
            qa: get().qa.map((item) => (item.id === id ? updated : item)),
        })
    },

    deleteQA: async (id) => {
        await SupabaseService.deleteQATraining(id)
        set({ qa: get().qa.filter((item) => item.id !== id) })
    },
}))
