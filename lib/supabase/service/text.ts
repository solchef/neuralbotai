"use client"
import { createClient } from "../client"

const supabase = createClient()

export const TextService = {
    async getTextEntries(siteId: string) {
        const { data, error } = await supabase.from("text_training").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async addTextEntry(siteId: string, content: string) {
        const { error } = await supabase.from("text_training").insert({ site_id: siteId, content })
        if (error) throw error
    },

    async updateTextEntry(entryId: string, content: string) {
        const { error } = await supabase.from("text_training").update({ content }).eq("id", entryId)
        if (error) throw error
    },

    async deleteTextEntry(entryId: string) {
        const { error } = await supabase.from("text_training").delete().eq("id", entryId)
        if (error) throw error
    },
}
