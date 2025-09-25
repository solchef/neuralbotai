// 

"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SiteSidebar } from "@/components/dashboard/site-sidebar"
import { useState } from "react"

export function DashboardLayoutClient({
    children,
    user,
    tenant,
}: {
    children: React.ReactNode
    user: any
    tenant: any
}) {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    // Detect if we are inside a "site" dashboard page
    const isSitePage = pathname?.startsWith("/dashboard/sites/")

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Main Sidebar */}
            <DashboardSidebar user={user} tenant={tenant} collapsed={isSitePage ? true : collapsed} />

            {/* Site Sidebar (only if on site page) */}
            {isSitePage && <SiteSidebar />}

            {/* Main content */}
            <div
                className={`
                    relative transition-all
                    ${isSitePage ? "lg:pl-[21rem]" : collapsed ? "lg:pl-20" : "lg:pl-72"}
                `}
            >
                <DashboardHeader
                    user={user}
                    tenant={tenant}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <main className="py-8 lg:py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    )
}
