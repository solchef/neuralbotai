"use client"

import { Header } from "@/components/marketing/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Shield, Lock, Eye, UserCheck, Mail, Sparkles } from "lucide-react"

export default function PrivacyPage() {
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
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
                Your <span className="gradient-text">Privacy</span> Matters
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
                We're committed to protecting your data and being transparent about how we use it.
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
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">1. Information We Collect</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, use our
                    services, or contact us for support.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <UserCheck className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Account information (name, email, password)</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Chatbot content and training data</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Eye className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Usage data and analytics</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Communication records</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">2. How We Use Your Information</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Provide and operate our chatbot services</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Process transactions and send related information</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Send technical notices and support messages</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Improve our services and develop new features</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">3. Data Security</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. All data is encrypted using
                    military-grade encryption both in transit and at rest.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">4. Data Retention</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We retain your information for as long as your account is active or as needed to provide you
                    services. You may request deletion of your data at any time through your account settings or by
                    contacting us.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <UserCheck className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">5. Your Rights</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    You have certain rights regarding your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Access and update your information</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Request deletion of your data</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Object to processing of your information</span>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-base">Data portability</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border glow-card">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">6. Contact Us</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:privacy@neural.ai" className="text-primary hover:text-primary/80 font-semibold">
                      privacy@neural.ai
                    </a>{" "}
                    or through our contact form.
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
