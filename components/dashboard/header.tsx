"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Menu, User, LogOut, HelpCircle, Zap, Crown, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
  tenant: any
  collapsed: boolean
  setCollapsed: (value: boolean) => void

}

export function DashboardHeader({ user, tenant, collapsed, setCollapsed }: DashboardHeaderProps) {
  const userInitials = user.user_metadata?.name
    ? user.user_metadata.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border/20 bg-background/80 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Sidebar toggle button */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-6 w-6" />
        ) : (
          <ChevronLeft className="h-6 w-6" />
        )}
      </button>
      <button
        type="button"
        className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-border/50 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ThemeToggle />

          <button
            type="button"
            className="relative -m-2.5 p-2.5 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/50 rounded-lg"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></span>
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border/50" aria-hidden="true" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-12 w-12 rounded-full hover:bg-accent/50 transition-all duration-200"
              >
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 border-border/50 bg-card/80 backdrop-blur-xl" align="end" forceMount>
              <div className="flex items-center justify-start gap-4 p-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2 leading-none">
                  <p className="font-semibold text-lg">{user.user_metadata?.name || user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge
                    variant="secondary"
                    className={`text-xs w-fit ${tenant.plan?.name === "Business"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {tenant.plan?.name === "Business" && <Crown className="h-3 w-3 mr-1" />}
                    {tenant.plan?.name || "Free Plan"}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem asChild className="p-3 text-base">
                <Link href="/dashboard/settings" className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="p-3 text-base">
                <Link href="/dashboard/billing" className="flex items-center gap-3">
                  <Zap className="h-5 w-5" />
                  Billing & Usage
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="p-3 text-base">
                <Link href="/docs" className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5" />
                  Help & Documentation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem asChild className="p-3 text-base text-destructive focus:text-destructive">
                <form action="/auth/signout" method="post" className="w-full">
                  <button type="submit" className="flex w-full items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
