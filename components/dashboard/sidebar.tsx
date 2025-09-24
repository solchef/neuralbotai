"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Plus,
  Zap,
  Bot,
  Database,
  Crown,
  Sparkles,
} from "lucide-react"

interface SidebarProps {
  user: any
  tenant: any
}

export function DashboardSidebar({ user, tenant }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "AI Chatbots",
      href: "/dashboard/sites",
      icon: Bot,
      current: pathname.startsWith("/dashboard/sites"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname.startsWith("/dashboard/analytics"),
    },
    {
      name: "Knowledge Base",
      href: "/dashboard/knowledge",
      icon: Database,
      current: pathname.startsWith("/dashboard/knowledge"),
    },
    {
      name: "Team",
      href: "/dashboard/teams",
      icon: Users,
      current: pathname.startsWith("/dashboard/teams"),
    },
    {
      name: "Billing & Usage",
      href: "/dashboard/billing",
      icon: Zap,
      current: pathname.startsWith("/dashboard/billing"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname.startsWith("/dashboard/settings"),
    },
  ]

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-8 overflow-y-auto border-r border-border/50 bg-card/60 backdrop-blur-xl px-6 pb-6">
        <div className="flex h-20 shrink-0 items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary/20 rounded-full p-2 group-hover:bg-primary/30 transition-colors">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold gradient-text">Neural.ai</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 glow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{tenant.name}</h2>
              <Badge
                variant="secondary"
                className={`text-sm mt-2 ${tenant.plan?.name === "Business"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground"
                  }`}
              >
                {tenant.plan?.name === "Business" && <Crown className="h-4 w-4 mr-1" />}
                {tenant.plan?.name || "Free Plan"}
              </Badge>
            </div>
          </div>

          <Link href="/dashboard/sites/new">
            <Button
              size="lg"
              className="w-full justify-start glow-primary text-base py-3 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="mr-3 h-5 w-5" />
              Chatbot
            </Button>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-3">
            <li>
              <ul role="list" className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-primary/10 text-primary border-primary/20 glow-card shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-border/50",
                        "group flex gap-x-4 rounded-xl p-4 text-base leading-6 font-medium transition-all duration-300 border border-transparent hover:shadow-md transform hover:scale-105",
                      )}
                    >
                      <item.icon
                        className={cn(
                          item.current ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                          "h-6 w-6 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        {(!tenant.plan || tenant.plan.name === "Free") && (
          <div className="p-6 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 rounded-xl border border-primary/20 glow-card">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div className="text-lg font-bold text-foreground">Upgrade to Business</div>
            </div>
            <div className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Unlock unlimited chatbots, advanced analytics, and priority support to scale your business.
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
        )}
      </div>
    </div>
  )
}
