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
import { Brain, ArrowRight, Sparkles, Check } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            name: name,
          },
        },
      })
      if (error) throw error
      router.push("/auth/verify-email")
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
                <CardTitle className="text-3xl font-bold mb-2">Create your account</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Get started with your AI chatbot platform today
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSignUp}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name" className="text-base font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input h-12 text-base border-border focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
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
                        placeholder="At least 6 characters"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-input h-12 text-base border-border focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="confirm-password" className="text-base font-medium">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Create account
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-base text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        href="/auth/login"
                        className="text-primary font-semibold hover:text-primary/80 transition-colors underline underline-offset-4"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Join 30,000+ businesses using Neural.ai</span>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Free 14-day trial with all features</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>No credit card required to start</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Cancel anytime, no long-term contracts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
