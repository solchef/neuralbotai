import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key
)

export async function POST() {
    try {
        // Fetch users
        const { data: users, error } = await supabase.auth.admin.listUsers()
        if (error) {
            console.error("Error fetching users:", error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!users?.users?.length) {
            return NextResponse.json({ message: "No users found" }, { status: 200 })
        }

        // Delete each user
        for (const user of users.users) {
            await supabase.auth.admin.deleteUser(user.id)
            console.log(`Deleted user: ${user.email}`)
        }

        return NextResponse.json({ message: `Deleted ${users.users.length} users` }, { status: 200 })
    } catch (err: any) {
        console.error("Unexpected error:", err.message)
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
    }
}
