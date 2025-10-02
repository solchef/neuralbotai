"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useDashboardStore } from "@/store/useDashboardStore"
import { DashboardStats } from "@/components/dashboard/main/dashboard-stats"
import { SitesGrid } from "@/components/dashboard/main/sites-grid"
// import { QuickActions } from "@/components/dashboard/main/quick-actions"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DashboardPage() {
    const { tenant, user, loadUserAndTenant } = useAuthStore()
    const { loadDashboard, sites, usage, isLoading } = useDashboardStore()

    useEffect(() => {
        loadUserAndTenant()
    }, [loadUserAndTenant])

    useEffect(() => {
        if (tenant) {
            loadDashboard(tenant.id)
        }
    }, [tenant, loadDashboard])

    if (isLoading || !user || !tenant || !sites) return <DashboardSkeleton />

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {user.user_metadata?.name || user.email}
                </h2>
                <p className="text-muted-foreground">
                    Manage your AI chatbots and monitor their performance from your dashboard.
                </p>
            </div>

            <DashboardStats sites={sites} usage={usage} />

            {/* Sites Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Your Chatbots</h3>
                    <Link href="/dashboard/sites/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Chatbot
                        </Button>
                    </Link>
                </div>
            </div>

            <SitesGrid sites={sites} />
            {/* <QuickActions /> */}
        </div>
    )
}
