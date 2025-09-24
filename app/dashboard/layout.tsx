import type React from "react"
import { requireAuth, getCurrentTenant } from "@/lib/auth/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  const tenant = await getCurrentTenant()

  if (!tenant) {
    redirect("/onboarding")
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-primary/3" />

      <DashboardSidebar user={user} tenant={tenant} />
      <div className="lg:pl-72 relative">
        <DashboardHeader user={user} tenant={tenant} />
        <main className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
