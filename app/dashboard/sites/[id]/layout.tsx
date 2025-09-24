"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, BarChart3, MessageSquare, Globe, Users, FileText, ArrowLeft } from "lucide-react"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const siteId = params.id as string
  const [site, setSite] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSite()
  }, [siteId])

  const fetchSite = async () => {
    try {
      const response = await fetch(`/api/sites/${siteId}`)
      if (response.ok) {
        const data = await response.json()
        setSite(data)
      }
    } catch (error) {
      console.error("Failed to fetch site:", error)
    } finally {
      setLoading(false)
    }
  }

  const navigation = [
    {
      name: "Overview",
      href: `/dashboard/sites/${siteId}`,
      icon: Globe,
      current: pathname === `/dashboard/sites/${siteId}`,
    },
    {
      name: "Analytics",
      href: `/dashboard/sites/${siteId}/analytics`,
      icon: BarChart3,
      current: pathname === `/dashboard/sites/${siteId}/analytics`,
    },
    {
      name: "Chat History",
      href: `/dashboard/sites/${siteId}/conversations`,
      icon: MessageSquare,
      current: pathname === `/dashboard/sites/${siteId}/conversations`,
    },
    {
      name: "Leads",
      href: `/dashboard/sites/${siteId}/leads`,
      icon: Users,
      current: pathname === `/dashboard/sites/${siteId}/leads`,
    },
    {
      name: "Live Chat",
      href: `/dashboard/sites/${siteId}/live-chat`,
      icon: MessageSquare,
      current: pathname === `/dashboard/sites/${siteId}/live-chat`,
    },
  ]

  const trainingNavigation = [
    {
      name: "Links / Docs",
      href: `/dashboard/sites/${siteId}/training/links`,
      icon: FileText,
      current: pathname === `/dashboard/sites/${siteId}/training/links`,
    },
    {
      name: "Text",
      href: `/dashboard/sites/${siteId}/training/text`,
      icon: FileText,
      current: pathname === `/dashboard/sites/${siteId}/training/text`,
    },
    {
      name: "Q&A",
      href: `/dashboard/sites/${siteId}/training/qa`,
      icon: MessageSquare,
      current: pathname === `/dashboard/sites/${siteId}/training/qa`,
    },
  ]

  const behaviorNavigation = [
    {
      name: "Tune AI",
      href: `/dashboard/sites/${siteId}/tune`,
      icon: Settings,
      current: pathname === `/dashboard/sites/${siteId}/tune`,
    },
    {
      name: "Test Your Bot",
      href: `/dashboard/sites/${siteId}/test`,
      icon: MessageSquare,
      current: pathname === `/dashboard/sites/${siteId}/test`,
    },
  ]

  const deploymentNavigation = [
    {
      name: "Appearance",
      href: `/dashboard/sites/${siteId}/appearance`,
      icon: Settings,
      current: pathname === `/dashboard/sites/${siteId}/appearance`,
    },
    {
      name: "Deploy",
      href: `/dashboard/sites/${siteId}/deploy`,
      icon: Globe,
      current: pathname === `/dashboard/sites/${siteId}/deploy`,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="flex">
          <div className="w-64 border-r bg-muted/10">
            <div className="p-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-semibold">{site?.name || "Loading..."}</h1>
                <p className="text-sm text-muted-foreground">{site?.domain}</p>
              </div>
              <Badge variant={site?.status === "active" ? "default" : "secondary"}>{site?.status || "unknown"}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r bg-muted/10">
          <nav className="p-4 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">ACTIVITY</h3>
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                TRAINING DATA
              </h3>
              <div className="space-y-1">
                {trainingNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">BEHAVIOUR</h3>
              <div className="space-y-1">
                {behaviorNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">DEPLOYMENT</h3>
              <div className="space-y-1">
                {deploymentNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
