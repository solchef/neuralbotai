"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Globe, BarChart3, MessageSquare, Users, FileText, Settings } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DashboardLayoutClient } from "@/components/dashboard/layout-client"

export default function SiteLayout({
    children,
    user,
    tenant,
}: {
    children: React.ReactNode
    user: any
    tenant: any
}) {
    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()
    const siteId = params.id as string
    const [sites, setSites] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSites()
    }, [])

    const fetchSites = async () => {
        try {
            const res = await fetch(`/api/sites`)
            if (res.ok) {
                setSites(await res.json())
            }
        } finally {
            setLoading(false)
        }
    }

    const sections = [
        {
            title: "Activity",
            items: [
                { name: "Overview", href: `/dashboard/sites/${siteId}`, icon: Globe },
                { name: "Analytics", href: `/dashboard/sites/${siteId}/analytics`, icon: BarChart3 },
                { name: "Chat History", href: `/dashboard/sites/${siteId}/conversations`, icon: MessageSquare },
                { name: "Leads", href: `/dashboard/sites/${siteId}/leads`, icon: Users },
                { name: "Live Chat", href: `/dashboard/sites/${siteId}/live-chat`, icon: MessageSquare },
            ],
        },
        {
            title: "Training Data",
            items: [
                { name: "Links / Docs", href: `/dashboard/sites/${siteId}/training/links`, icon: FileText },
                { name: "Text", href: `/dashboard/sites/${siteId}/training/text`, icon: FileText },
                { name: "Q&A", href: `/dashboard/sites/${siteId}/training/qa`, icon: MessageSquare },
            ],
        },
        {
            title: "Behaviour",
            items: [
                { name: "Tune AI", href: `/dashboard/sites/${siteId}/tune`, icon: Settings },
                { name: "Test Your Bot", href: `/dashboard/sites/${siteId}/test`, icon: MessageSquare },
            ],
        },
        {
            title: "Deployment",
            items: [
                { name: "Appearance", href: `/dashboard/sites/${siteId}/appearance`, icon: Settings },
                { name: "Deploy", href: `/dashboard/sites/${siteId}/deploy`, icon: Globe },
            ],
        },
    ]

    const siteSidebar = (
        <div className="flex flex-col h-full">
            {/* Bot Selector */}
            <div className="h-16 border-b px-4 flex items-center">
                <Select
                    value={siteId}
                    onValueChange={(val) => router.push(`/dashboard/sites/${val}`)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select bot" />
                    </SelectTrigger>
                    <SelectContent>
                        {sites.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                                {s.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon
                                const active = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${active
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    )

    if (loading) {
        return <div className="min-h-screen bg-background">Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}
