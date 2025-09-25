// // app/dashboard/sites/[id]/page.tsx
// import SitePageClient from "./SitePageClient"
// import { requireAuth, getCurrentTenant } from "@/lib/auth/server"
// import { createClient } from "@/lib/supabase/server"
// import { notFound } from "next/navigation"

// interface PageProps {
//   params: { id: string }
// }

// export default async function SitePage({ params }: PageProps) {
//   const { id } = await params
//   await requireAuth()
//   const tenant = await getCurrentTenant()
//   const supabase = await createClient()

//   // Fetch site
//   const { data: site } = await supabase
//     .from("sites")
//     .select("*")
//     .eq("id", id)
//     .eq("tenant_id", tenant.id)
//     .single()

//   if (!site) {
//     notFound()
//   }

//   // Fetch recent chats
//   const { data: recentChats } = await supabase
//     .from("chat_logs")
//     .select("*")
//     .eq("site_id", site.id)
//     .order("created_at", { ascending: false })
//     .limit(5)

//   // Fetch usage stats
//   const thirtyDaysAgo = new Date()
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

//   const { data: usage } = await supabase
//     .from("usage")
//     .select("*")
//     .eq("site_id", site.id)
//     .gte("date", thirtyDaysAgo.toISOString().split("T")[0])

//   const totalQueries = usage?.reduce((sum, day) => sum + day.queries_count, 0) || 0

//   return (
//     <SitePageClient
//       site={site}
//       recentChats={recentChats || []}
//       totalQueries={totalQueries}
//     />
//   )
// }


// app/dashboard/sites/[id]/page.tsx
import SitePageClient from "./SitePageClient"
import { requireAuth } from "@/lib/auth/server"

interface PageProps {
  params: { id: string }
}

export default async function SitePage({ params }: PageProps) {
  await requireAuth()
  return <SitePageClient siteId={params.id} />
}
