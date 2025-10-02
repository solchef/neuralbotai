"use client"
import { createClient } from "../client"
const supabase = createClient()

export const getUser = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error) throw error
    return user
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}
