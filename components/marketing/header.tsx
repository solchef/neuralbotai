"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Brain, Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-primary/20 rounded-full p-2 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold gradient-text">Neural.ai</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Platform <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 border-border/50 bg-card/80 backdrop-blur-xl">
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/features" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Core Features
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/widget-demo" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Live Demo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/api" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Developer API
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/security" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Security & Compliance
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 border-border/50 bg-card/80 backdrop-blur-xl">
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/solutions/customer-support" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Customer Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/solutions/sales" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Sales Automation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/solutions/hr" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    HR & Training
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/solutions/enterprise" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Enterprise AI
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/pricing"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 border-border/50 bg-card/80 backdrop-blur-xl">
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/docs" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Documentation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/blog" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Blog & Insights
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/contact" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Contact Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/about" className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    About Neural.ai
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-base font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="glow-primary text-base font-medium px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 bg-card/50 backdrop-blur-sm rounded-b-lg">
            <nav className="flex flex-col space-y-6">
              <div className="space-y-3">
                <div className="text-sm font-bold text-primary px-3">Platform</div>
                <Link
                  href="/features"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Core Features
                </Link>
                <Link
                  href="/widget-demo"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Live Demo
                </Link>
                <Link
                  href="/api"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Developer API
                </Link>
                <Link
                  href="/security"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Security & Compliance
                </Link>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-primary px-3">Solutions</div>
                <Link
                  href="/solutions/customer-support"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Customer Support
                </Link>
                <Link
                  href="/solutions/sales"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Sales Automation
                </Link>
                <Link
                  href="/solutions/hr"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  HR & Training
                </Link>
                <Link
                  href="/solutions/enterprise"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Enterprise AI
                </Link>
              </div>

              <Link
                href="/pricing"
                className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
              >
                Pricing
              </Link>

              <div className="space-y-3">
                <div className="text-sm font-bold text-primary px-3">Resources</div>
                <Link
                  href="/docs"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Documentation
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 text-base text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Blog & Insights
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Contact Support
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  About Neural.ai
                </Link>
              </div>

              <div className="flex flex-col space-y-4 pt-6 border-t border-border/50">
                <div className="flex justify-start px-3">
                  <ThemeToggle />
                </div>
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full text-base font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="w-full glow-primary text-base font-medium py-3 rounded-full">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
