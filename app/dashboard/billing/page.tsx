"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Download, Zap } from "lucide-react"
import { useBillingStore } from "@/store/useBillingStore"


export default function BillingPage() {
  // const [currentPlan, setCurrentPlan] = useState<any>(null)
  // const [usage, setUsage] = useState<any>(null)
  // const [invoices, setInvoices] = useState<any[]>([])
  // const [loading, setLoading] = useState(true)

  const { currentPlan, usage, invoices, plans, loading, fetchPlans, fetchBillingData } = useBillingStore()

  useEffect(() => {
    fetchBillingData("0152e3e7-2029-4b43-82b9-422dab661c10")
    fetchPlans()
  }, [fetchBillingData, fetchPlans])


  const handleUpgrade = async (planName: string) => {
    try {
      const response = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: planName }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/billing/create-portal-session", {
        method: "POST",
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      }
    } catch (error) {
      console.error("Failed to create portal session:", error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        {currentPlan && (
          <Button onClick={handleManageSubscription} variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Subscription
          </Button>
        )}
      </div>

      {/* Current Plan & Usage */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            {currentPlan ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <p className="text-muted-foreground">
                      ${currentPlan.price}/{currentPlan.interval}
                    </p>
                  </div>
                  <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>
                    {currentPlan.status}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next billing date</span>
                    <span>{new Date(currentPlan.current_period_end).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment method</span>
                    <span>•••• •••• •••• {currentPlan.last4}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No active subscription</p>
                <Button onClick={() => handleUpgrade("Professional")}>
                  <Zap className="h-4 w-4 mr-2" />
                  Choose a Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>Your current usage across all features</CardDescription>
          </CardHeader>
          <CardContent>
            {usage ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversations</span>
                    <span>
                      {usage?.conversations?.used.toLocaleString()} /{" "}
                      {usage?.conversations?.limit === -1 ? "Unlimited" : usage?.conversations?.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={
                      usage?.conversations?.limit === -1
                        ? 0
                        : (usage?.conversations?.used / usage?.conversations?.limit) * 100
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active Sites</span>
                    <span>
                      {usage?.sites?.used} / {usage?.sites?.limit === -1 ? "Unlimited" : usage?.sites?.limit}
                    </span>
                  </div>
                  <Progress
                    value={usage?.sites?.limit === -1 ? 0 : (usage?.sites?.used / usage?.sites?.limit) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Team Members</span>
                    <span>
                      {usage?.teamMembers?.used} /{" "}
                      {usage?.teamMembers?.limit === -1 ? "Unlimited" : usage?.teamMembers?.limit}
                    </span>
                  </div>
                  <Progress
                    value={
                      usage?.teamMembers?.limit === -1 ? 0 : (usage?.teamMembers?.used / usage?.teamMembers?.limit) * 100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Loading usage data...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 border rounded-lg ${plan.popular ? "border-primary shadow-lg" : "border-border"
                  }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${(plan.price_cents / 100).toFixed(2)}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {Object.entries(plan.features).map(([key, value], index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      {typeof value === "boolean" ? (
                        value ? key.replace("_", " ") : null
                      ) : (
                        <>
                          {value} {key.replace("_", " ")}
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan.name)}
                  disabled={currentPlan?.name === plan.name}
                >
                  {currentPlan?.name === plan.name ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Invoice #{invoice.number}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.created).toLocaleDateString()} • $
                      {(invoice.amount_paid / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No billing history available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
