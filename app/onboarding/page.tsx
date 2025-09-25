"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOrganizationStore } from "@/store/useOrganizationStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"
// import { SupabaseService } from "@/lib/supabase/service"

export default function OnboardingPage() {
  const router = useRouter()
  const {
    organizationName,
    setOrganizationName,
    isLoading,
    error,
    createTenant,
    loadTenant
  } = useOrganizationStore()

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    const tenant = await createTenant(organizationName)
    if (tenant?.id) {
      router.push("/dashboard")
    }
  }

  const getUser = async () => {
    const tenant = await loadTenant()
    console.log(tenant)
  }

  useEffect(() => {
    getUser()
  }, [])



  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center mb-8 space-x-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NeuralAI Bots</span>
          </div>

          <Card className="border border-border shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to NeuralAI Bots</CardTitle>
              <CardDescription>Set up your workspace to start building chatbots and other AI tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateOrganization} className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input
                    id="organization"
                    type="text"
                    placeholder="Acme Corp"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be your workspace name where you'll manage your AI tools.
                  </p>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating organization..." : "Create Organization"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
