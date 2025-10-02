"use client"
import { createClient } from "../client"

const supabase = createClient()

export const getQATraining = async (siteId: string) => {
    const { data, error } = await supabase
        .from("qa_training")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false })

    if (error) throw error
    return data
}

export const addQATraining = async (siteId: string, question: string, answer: string) => {
    const { data, error } = await supabase
        .from("qa_training")
        .insert([{ site_id: siteId, question, answer }])
        .select()
        .single()

    if (error) throw error
    return data
}

export const updateQATraining = async (id: string, question: string, answer: string) => {
    const { data, error } = await supabase
        .from("qa_training")
        .update({ question, answer, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

    if (error) throw error
    return data
}

export const deleteQATraining = async (id: string) => {
    const { error } = await supabase.from("qa_training").delete().eq("id", id)
    if (error) throw error
}
