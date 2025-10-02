"use client"
import { createClient } from "../client"

const supabase = createClient()

export const AuthService = {
    getUser: async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()
        if (error) throw error
        return user
    },

    async logout() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },
}
