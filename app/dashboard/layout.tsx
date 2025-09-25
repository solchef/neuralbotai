import type React from "react"
import { redirect } from "next/navigation"
import { DashboardLayoutClient } from "@/components/dashboard/layout-client"
import { getCurrentTenant, requireAuth } from "@/lib/auth/server"

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
