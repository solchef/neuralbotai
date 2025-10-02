
"use client"
import { createClient } from "../client"
import { Link, LinkStatus } from "@/store/useSiteLinksTrainingStore"

const supabase = createClient()

const validStatuses: LinkStatus[] = ["indexed", "pending", "failed", "no-space"]
const normalizeStatus = (status: string): LinkStatus =>
    validStatuses.includes(status as LinkStatus) ? (status as LinkStatus) : "pending"

export const getLinks = async (siteId: string): Promise<Link[]> => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false })

    if (error) throw error

    return (data ?? []).map((row) => ({
        ...row,
        status: normalizeStatus(row.status),
    }))
}

export const addLinks = async (siteId: string, urls: string[]): Promise<Link[]> => {
    const inserts = urls.map((url) => ({ site_id: siteId, url, type: "link" }))
    const { data, error } = await supabase.from("links").insert(inserts).select("*")

    if (error) throw error

    return (data ?? []).map((row) => ({
        ...row,
        status: normalizeStatus(row.status),
    }))
}

export const deleteLinks = async (ids: string[]): Promise<boolean> => {
    const { error } = await supabase.from("links").delete().in("id", ids)
    if (error) throw error
    return true
}

export const retrainLinks = async (ids: string[]): Promise<boolean> => {
    // Here you could call a Supabase function instead
    console.log("Retraining requested for:", ids)
    return true
}

export const uploadDocument = async (siteId: string, file: File): Promise<Link[]> => {
    const filePath = `${siteId}/${Date.now()}-${file.name}`

    // 1. Upload file
    const { error: uploadError } = await supabase.storage
        .from("training_docs")
        .upload(filePath, file)

    if (uploadError) throw uploadError

    // 2. Get public URL
    const { data: urlData } = supabase.storage
        .from("training_docs")
        .getPublicUrl(filePath)

    // 3. Insert record in links table
    const { data, error: insertError } = await supabase
        .from("links")
        .insert({
            site_id: siteId,
            type: "doc",
            url: urlData.publicUrl,
            file_name: file.name,
            file_size: file.size,
            chars: 0,
            status: "pending",
        })
        .select("*")

    if (insertError) throw insertError

    // ✅ Return proper Link[]
    return (data ?? []).map((row) => ({
        ...row,
        status: normalizeStatus(row.status),
    }))
}

