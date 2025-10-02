"use client"
import { createClient } from "../client"

const supabase = createClient()

export const getTextEntries = async (siteId: string) => {
    const { data, error } = await supabase
        .from("text_training")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false })
    if (error) throw error
    return data
}

export const addTextEntry = async (siteId: string, title: string, content: string) => {
    const { data, error } = await supabase
        .from("text_training")
        .insert([{ site_id: siteId, title, content }])
        .select()
        .single()
    if (error) throw error
    return data
}

export const updateTextEntry = async (id: string, title: string, content: string) => {
    const { data, error } = await supabase
        .from("text_training")
        .update({ title, content, chars: content.length })
        .eq("id", id)
        .select()
        .single()
    if (error) throw error
    return data
}

export const deleteTextEntry = async (id: string) => {
    const { error } = await supabase.from("text_training").delete().eq("id", id)
    if (error) throw error
    return true
}
