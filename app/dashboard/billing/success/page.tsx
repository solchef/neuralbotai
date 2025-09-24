"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function BillingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan")

  useEffect(() => {
    // In a real implementation, you might want to verify the payment status here
    console.log("Payment successful for plan:", plan)
  }, [plan])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Payment Successful!</CardTitle>
          <CardDescription>Your subscription to the {plan} plan has been activated.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>You now have access to all {plan} plan features.</p>
            <p>A confirmation email has been sent to your inbox.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/dashboard/billing")}
            >
              View Billing
            </Button>
            <Button className="flex-1" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
