import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Globe, Shield, Zap, Target, Heart, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Heart className="h-4 w-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Revolutionizing customer engagement with <span className="text-primary">intelligent AI</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Neural.ai was founded with a simple mission: make AI-powered customer support accessible to businesses of
              all sizes, without requiring technical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Empowering businesses with accessible AI</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe every business should have access to intelligent, 24/7 customer support. Our platform removes
                the technical barriers, allowing anyone to create sophisticated AI chatbots in minutes, not months.
              </p>
              <p className="text-lg text-muted-foreground">
                From universities to enterprises, we're democratizing AI technology and helping organizations provide
                better customer experiences while reducing operational costs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">95+</div>
                  <div className="text-sm text-muted-foreground">Languages Supported</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">3 min</div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Neural.ai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Security First</h3>
              <p className="text-muted-foreground">
                Military-grade encryption and GDPR compliance ensure your data is always protected.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Constantly pushing the boundaries of what's possible with AI technology.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer-Centric</h3>
              <p className="text-muted-foreground">
                Every feature is built to reduce workload and maximize efficiency for our users.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                Delivering reliable, high-quality solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to join our mission?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building intelligent chatbots today and transform your customer engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Neural.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
