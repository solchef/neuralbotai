"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare } from "lucide-react"

export default function OnboardingPage() {
  const [organizationName, setOrganizationName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Create tenant
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .insert({
          owner_user_id: user.id,
          name: organizationName,
        })
        .select()
        .single()

      if (tenantError) throw tenantError

      // Add user as admin member
      const { error: membershipError } = await supabase.from("memberships").insert({
        tenant_id: tenant.id,
        user_id: user.id,
        role: "admin",
        accepted_at: new Date().toISOString(),
      })

      if (membershipError) throw membershipError

      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8" />
              <span className="text-xl font-bold">ChatBot AI</span>
            </div>
          </div>

          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to ChatBot AI</CardTitle>
              <CardDescription>Let's set up your organization to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateOrganization}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Acme Corp"
                      required
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      className="bg-input"
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be the name of your workspace where you'll manage your chatbots.
                    </p>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating organization..." : "Create Organization"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
