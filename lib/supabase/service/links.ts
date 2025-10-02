"use client"
import { createClient } from "../client"

const supabase = createClient()

export const LinksService = {
    async createLink({ siteId, type, url }: { siteId: string; type: string; url: string }) {
        const { error } = await supabase.from("links").insert({
            site_id: siteId,
            training_type: type,
            url,
            status: "pending",
        })
        if (error) throw error
    },

    async getLinks(siteId: string) {
        const { data, error } = await supabase.from("links").select("*").eq("site_id", siteId)
        if (error) throw error
        return data
    },

    async addLinks(siteId: string, links: { type: string; url: string }[]) {
        const { error } = await supabase
            .from("links")
            .insert(links.map((l) => ({ site_id: siteId, training_type: l.type, url: l.url })))
        if (error) throw error
    },

    async deleteLinks(siteId: string, linkIds: string[]) {
        const { error } = await supabase.from("links").delete().eq("site_id", siteId).in("id", linkIds)
        if (error) throw error
    },

    async retrainLinks(siteId: string) {
        await supabase.rpc("retrain_links", { site_id: siteId })
    },

    async uploadDocument(siteId: string, file: File) {
        const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(`${siteId}/${file.name}`, file, { upsert: true })
        if (uploadError) throw uploadError
    },
}
