import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8" />
              <span className="text-xl font-bold">ChatBot AI</span>
            </Link>
          </div>

          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>We&apos;ve sent you a verification link to complete your registration</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Click the link in your email to verify your account and start building your AI chatbot.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-primary">
                    try signing up again
                  </Link>
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
