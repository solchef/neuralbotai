"use client"

import { Header } from "@/components/marketing/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { FileText, Scale, Shield, Users, CreditCard, AlertTriangle, Mail } from "lucide-react"

export default function TermsPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden hero-bg">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <Badge
                variant="secondary"
                className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2"
              >
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
                <span className="gradient-text">Terms</span> of Service
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
                Clear and fair terms that govern the use of our AI chatbot platform.
              </p>
              <p className="text-lg text-muted-foreground">Last updated: January 1, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Scale className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">1. Acceptance of Terms</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    By accessing and using Neural.ai's services, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">2. Use License</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Permission is granted to temporarily use Neural.ai's services for personal and commercial purposes.
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Modify or copy the materials</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Use materials for unauthorized commercial purposes</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Attempt to reverse engineer any software</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Remove copyright or proprietary notations</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">3. Service Availability</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right
                    to modify or discontinue services with reasonable notice to ensure the best possible experience for
                    all users.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">4. User Responsibilities</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Users are responsible for:</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Maintaining confidentiality of account credentials</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">All activities that occur under their account</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Ensuring content complies with applicable laws</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Not using the service for illegal or harmful purposes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">5. Payment Terms</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable
                    except as required by law or as specifically stated in our refund policy. We offer a 14-day free
                    trial for all paid plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <AlertTriangle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">6. Limitation of Liability</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Neural.ai shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                    losses resulting from your use of our services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">7. Contact Information</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at{" "}
                    <a href="mailto:legal@neural.ai" className="text-primary hover:text-primary/80 font-semibold">
                      legal@neural.ai
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">&copy; 2025 Neural.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
