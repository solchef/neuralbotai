"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, Users, Activity } from "lucide-react"

export function DashboardStats({ sites, usage, planLimit, teamMembersCount, isLoading }: any) {
    if (isLoading) {
        return <p>Loading stats...</p>
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Active Chatbots" value={sites?.length || 0} icon={<Bot className="h-5 w-5 text-primary" />} />
            <StatCard
                title="Messages This Month"
                value={usage.toLocaleString()}
                subtitle={planLimit > 0 ? `of ${planLimit.toLocaleString()} limit` : "Unlimited"}
                icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />
            <StatCard
                title="Team Members"
                value={teamMembersCount}
                subtitle="Collaborating members"
                icon={<Users className="h-5 w-5 text-primary" />}
            />
            <StatCard
                title="Plan Usage"
                value={planLimit > 0 ? Math.round((usage / planLimit) * 100) + "%" : "0%"}
                subtitle="Monthly consumption"
                icon={<Activity className="h-5 w-5 text-primary" />}
            />
        </div>
    )
}

function StatCard({ title, value, subtitle, icon }: any) {
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
