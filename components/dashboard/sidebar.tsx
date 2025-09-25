"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Brain,
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Zap,
  Bot,
  Database,
  Crown,
  Sparkles,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  user: any
  tenant: any
  collapsed: boolean
}

export function DashboardSidebar({ user, tenant, collapsed }: SidebarProps) {
  const pathname = usePathname()

  // Auto-collapse main sidebar if inside site pages
  const isSitePage = pathname?.startsWith("/dashboard/sites")
  collapsed = isSitePage ? true : false

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, current: pathname === "/dashboard" },
    { name: "AI Chatbots", href: "/dashboard/sites", icon: Bot, current: pathname.startsWith("/dashboard/sites") },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, current: pathname.startsWith("/dashboard/analytics") },
    { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Database, current: pathname.startsWith("/dashboard/knowledge") },
    { name: "Team", href: "/dashboard/teams", icon: Users, current: pathname.startsWith("/dashboard/teams") },
    { name: "Billing & Usage", href: "/dashboard/billing", icon: Zap, current: pathname.startsWith("/dashboard/billing") },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, current: pathname.startsWith("/dashboard/settings") },
  ]

  return (
    <TooltipProvider>
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col border-r border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300",
          collapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary/20 rounded-full p-2 group-hover:bg-primary/30 transition-colors">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            {!collapsed && <span className="text-2xl font-bold gradient-text">Neural.ai</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-2">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-primary/10 text-primary border-primary/20 glow-card shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-border/50",
                        "group flex items-center gap-x-4 rounded-xl px-4 py-3 text-base leading-6 font-medium transition-all duration-300 border border-transparent hover:shadow-md"
                      )}
                    >
                      <item.icon
                        className={cn(
                          item.current ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade box */}
        <div
          className={cn(
            "p-4 m-4 rounded-xl border border-primary/20 glow-card transition-all duration-300",
            collapsed ? "hidden" : "block bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-lg font-bold text-foreground">Upgrade to Business</div>
          </div>
          <Link href="/dashboard/billing">
            <Button
              size="sm"
              variant="outline"
              className="w-full text-sm bg-transparent hover:bg-primary/5 border-primary/20 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <Crown className="mr-2 h-4 w-4" />
              View Plans
            </Button>
          </Link>
        </div>
      </div>
    </TooltipProvider>
  )
}
