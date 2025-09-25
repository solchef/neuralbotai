"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Database, Zap } from "lucide-react"

export function QuickActions() {
    const actions = [
        { href: "/dashboard/analytics", icon: <TrendingUp className="h-8 w-8 text-primary" />, title: "Analytics", desc: "Performance insights" },
        { href: "/dashboard/teams", icon: <Users className="h-8 w-8 text-primary" />, title: "Team", desc: "Manage collaborators" },
        { href: "/dashboard/knowledge", icon: <Database className="h-8 w-8 text-primary" />, title: "Knowledge", desc: "Training data" },
        { href: "/dashboard/billing", icon: <Zap className="h-8 w-8 text-primary" />, title: "Billing", desc: "Usage & plans" },
    ]

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ href, icon, title, desc }) => (
                <Link key={href} href={href}>
                    <Card className="cursor-pointer hover:border-primary/20 transition">
                        <CardContent className="flex items-center p-8">
                            <div className="bg-primary/10 rounded-full p-4 mr-6">{icon}</div>
                            <div>
                                <h4 className="font-semibold text-lg">{title}</h4>
                                <p className="text-sm text-muted-foreground">{desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
