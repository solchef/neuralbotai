"use client"

import { Header } from "@/components/marketing/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CheckCircle, X, Zap, ArrowRight, Star } from "lucide-react"

export default function PricingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "1 chatbot",
        "50 messages/month",
        "500k characters",
        "Basic integrations",
        "Email support",
        "Standard AI models",
      ],
      limitations: ["No team collaboration", "No advanced analytics", "No white-labeling"],
      cta: "Get Started",
      popular: false,
      color: "muted",
    },
    {
      name: "Business",
      price: "$69",
      period: "per month",
      description: "For growing businesses and teams",
      features: [
        "5 chatbots",
        "5,000 messages/month",
        "15M characters",
        "Live chat handover",
        "Advanced analytics",
        "Team collaboration (5 members)",
        "All integrations",
        "Custom branding",
        "Priority support",
      ],
      limitations: ["No white-labeling", "No API access"],
      cta: "Start Free Trial",
      popular: true,
      color: "primary",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For established companies at scale",
      features: [
        "Unlimited chatbots",
        "Unlimited messages",
        "Unlimited characters",
        "Full white-labeling",
        "API access",
        "Team collaboration (unlimited)",
        "Custom integrations",
        "Dedicated support",
        "Custom domain",
        "Audit logs",
        "SLA guarantee",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "secondary",
    },
  ]

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
          <div className="text-center max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <Badge
                variant="secondary"
                className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2"
              >
                <Zap className="h-4 w-4 mr-2" />
                Simple, Transparent Pricing
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
                Choose the perfect plan for <span className="gradient-text">your business</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground text-balance mb-16 max-w-5xl mx-auto leading-relaxed">
                Start free and scale as you grow. All plans include our core features with no hidden fees or setup
                costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`border-border relative glow-card transform hover:scale-105 transition-all duration-500 ${
                  plan.popular ? "border-primary glow-primary scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-lg px-6 py-2 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-12">
                  <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-6">
                    <span className="text-5xl lg:text-6xl font-bold">{plan.price}</span>
                    <span className="text-xl text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-lg text-muted-foreground mt-4">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-10">
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center gap-4 opacity-60">
                        <X className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        <span className="text-lg text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/sign-up" className="block">
                    <Button
                      className={`w-full text-lg py-4 ${plan.popular ? "glow-primary" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Everything you need to know</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Clear answers about our pricing and features
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-border glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">What counts as a message?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A message is any interaction sent to your chatbot by a visitor. This includes both questions and
                  responses in a conversation thread. Each back-and-forth exchange counts as one message.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Can I change plans anytime?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing adjustments. No long-term contracts or cancellation fees.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">What happens if I exceed my message limit?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your chatbot will continue to work, but additional messages will be charged at $0.01 per message.
                  You'll receive notifications as you approach your limit, and can upgrade anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Is there a free trial?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Yes! All paid plans come with a 14-day free trial. No credit card required to start, and you can
                  cancel anytime during the trial period with no charges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Do you offer enterprise plans?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Yes, we offer custom enterprise plans with higher limits, dedicated support, advanced security
                  features, and custom integrations. Contact our sales team for a personalized quote.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">
              Ready to transform your <span className="gradient-text">customer experience?</span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-16 text-balance">
              Start your free trial today and see how AI can revolutionize your customer interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 glow-primary rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 bg-transparent border-border hover:bg-card rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
