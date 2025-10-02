"use client"
import { createClient } from "../client"

const supabase = createClient()

export const QAService = {
    async getQATraining(siteId: string) {
        const { data, error } = await supabase.from("qa_training").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async addQATraining(siteId: string, question: string, answer: string) {
        const { error } = await supabase.from("qa_training").insert({ site_id: siteId, question, answer })
        if (error) throw error
    },

    async updateQATraining(entryId: string, question: string, answer: string) {
        const { error } = await supabase.from("qa_training").update({ question, answer }).eq("id", entryId)
        if (error) throw error
    },

    async deleteQATraining(entryId: string) {
        const { error } = await supabase.from("qa_training").delete().eq("id", entryId)
        if (error) throw error
    },
}
