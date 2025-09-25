import type React from "react"
import { requireAuth, getCurrentTenant } from "@/lib/auth/server"
import { redirect } from "next/navigation"
import { DashboardLayoutClient } from "@/components/dashboard/layout-client"

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
    <DashboardLayoutClient user={user} tenant={tenant}>
      {children}
    </DashboardLayoutClient>
  )
}
