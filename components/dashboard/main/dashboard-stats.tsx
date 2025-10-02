"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, Users, Activity } from "lucide-react"

interface UsageSummary {
    conversations: { used: number; limit: number }
    sites: { used: number; limit: number }
    teamMembers: { used: number; limit: number }
}

export function DashboardStats({ sites, usage }: { sites: any[]; usage: UsageSummary | null }) {
    if (!usage) return null

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* <StatCard
                title="Active Chatbots"
                value={sites?.length || 0}
                icon={<Bot className="h-5 w-5 text-primary" />}
            /> */}

            <StatCard
                title="Active Chatbots"
                value={usage.sites.used.toLocaleString()}
                subtitle={
                    usage.sites.limit > 0
                        ? `of ${usage.sites.limit.toLocaleString()} limit`
                        : "Unlimited"
                }
                icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />

            <StatCard
                title="Messages This Month"
                value={usage.conversations.used.toLocaleString()}
                subtitle={
                    usage.conversations.limit > 0
                        ? `of ${usage.conversations.limit.toLocaleString()} limit`
                        : "Unlimited"
                }
                icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />

            <StatCard
                title="Team Members"
                value={usage.teamMembers.used}
                subtitle={`of ${usage.teamMembers.limit} allowed`}
                icon={<Users className="h-5 w-5 text-primary" />}
            />

            <StatCard
                title="Plan Usage"
                value={
                    usage.conversations.limit > 0
                        ? Math.round((usage.conversations.used / usage.conversations.limit) * 100) + "%"
                        : "0%"
                }
                subtitle="Monthly consumption"
                icon={<Activity className="h-5 w-5 text-primary" />}
            />
        </div>
    )
}

function StatCard({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string
    value: string | number
    subtitle?: string
    icon: React.ReactNode
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-primary">{value}</div>
                {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </CardContent>
        </Card>
    )
}
