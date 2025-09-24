import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Code, Zap, Settings, MessageSquare, Globe, ArrowRight } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="h-4 w-4 mr-2" />
              Documentation
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Everything you need to build with Neural.ai
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Comprehensive guides, API references, and tutorials to help you create intelligent chatbots quickly and
              efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                API Reference
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quick Start Guide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your first chatbot up and running in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Import Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload documents, connect your website, or add YouTube videos to train your chatbot.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Customize Your Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Set your bot's personality, appearance, and behavior to match your brand.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Deploy Everywhere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Embed on your website or connect to messaging platforms with one click.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Documentation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive documentation to master Neural.ai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn the basics of creating and managing your chatbots.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Account Setup</li>
                  <li>• First Chatbot</li>
                  <li>• Basic Configuration</li>
                  <li>• Testing Your Bot</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-4" />
                <CardTitle>API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete API documentation for developers and integrations.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Authentication</li>
                  <li>• Endpoints</li>
                  <li>• Webhooks</li>
                  <li>• SDKs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Connect your chatbot to popular platforms and services.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• WhatsApp</li>
                  <li>• Telegram</li>
                  <li>• Slack</li>
                  <li>• Website Embed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <Settings className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Unlock the full potential of your AI chatbots.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom Personas</li>
                  <li>• Analytics</li>
                  <li>• A/B Testing</li>
                  <li>• White Labeling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Step-by-step guides for common use cases and scenarios.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Customer Support Bot</li>
                  <li>• Sales Assistant</li>
                  <li>• FAQ Bot</li>
                  <li>• Lead Generation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Tips and strategies for optimizing your chatbot performance.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Content Optimization</li>
                  <li>• User Experience</li>
                  <li>• Performance Tuning</li>
                  <li>• Security Guidelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Create your first intelligent chatbot in minutes with our easy-to-follow guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Start Building
                </Button>
              </Link>
              <Link href="/widget-demo">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Try Demo
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
