

import { requireAuth, getCurrentTenant } from "@/lib/auth/server"
import SiteLayout from "./SiteLayout"

export default async function SitesPageLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()
  const tenant = await getCurrentTenant()

  return (
    <SiteLayout user={user} tenant={tenant}>
      {children}
    </SiteLayout>
  )
}
