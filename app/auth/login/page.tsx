"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Brain, ArrowRight, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      <div className="relative flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-primary/20 rounded-full p-3 group-hover:bg-primary/30 transition-colors">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <span className="text-2xl font-bold gradient-text">Neural.ai</span>
              </Link>
            </div>

            <Card className="border-border glow-card bg-card/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold mb-2">Welcome back</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Enter your credentials to access your AI dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input h-12 text-base border-border focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password" className="text-base font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-input h-12 text-base border-border focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                    {error && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">{error}</p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-12 text-base glow-primary rounded-full transform hover:scale-105 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Sign in
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-base text-muted-foreground">
                      Don't have an account?{" "}
                      <Link
                        href="/auth/sign-up"
                        className="text-primary font-semibold hover:text-primary/80 transition-colors underline underline-offset-4"
                      >
                        Sign up for free
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Join 30,000+ businesses using Neural.ai</span>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span>✓ No setup fees</span>
                <span>✓ 14-day free trial</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
