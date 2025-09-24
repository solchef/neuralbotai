"use client"

import { Header } from "@/components/marketing/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  MessageSquare,
  Globe,
  FileText,
  BarChart3,
  Users,
  Shield,
  Palette,
  Code,
  Webhook,
  MessageCircle,
  Phone,
  ArrowRight,
  Check,
  Sparkles,
  Brain,
  Target,
} from "lucide-react"

export default function FeaturesPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const observeElement = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => ({ ...prev, [id]: entry.isIntersecting }))
      },
      { threshold: 0.1 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }

  useEffect(() => {
    const features = [
      "website-crawling",
      "document-processing",
      "conversations",
      "analytics",
      "team-collaboration",
      "customization",
      "developer-api",
      "webhooks",
      "security",
    ]
    features.forEach(observeElement)
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
          <div className="text-center max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <Badge
                variant="secondary"
                className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Complete Feature Set
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
                Everything you need to build <span className="gradient-text">intelligent chatbots</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground text-balance mb-16 max-w-5xl mx-auto leading-relaxed">
                From content ingestion to advanced analytics, our platform provides all the tools to create AI
                assistants that understand your business and delight your customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Animated Sections */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Core Platform Features
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Powerful AI at Your Fingertips</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Advanced features that make building and managing AI chatbots effortless
            </p>
          </div>

          {/* Feature 1: Website Crawling */}
          <div id="website-crawling" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["website-crawling"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Globe className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    01
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Website Crawling & Ingestion</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Automatically crawl your website and extract content to train your AI assistant. Configure crawl
                  depth, exclude patterns, and schedule regular updates to keep your chatbot knowledge current.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Sitemap-based intelligent crawling
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Configurable depth and exclusions
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Scheduled auto-sync updates
                  </li>
                </ul>
                <Button className="glow-primary text-lg px-8 py-4">
                  Try Website Crawling <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm space-y-2">
                      <div className="text-primary font-semibold text-lg mb-4">✓ Crawling neural.ai</div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ├── /about (processed - 2.4k words)
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ├── /features (processed - 3.1k words)
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ├── /pricing (processed - 1.8k words)
                      </div>
                      <div className="text-yellow-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>⏳ Processing 47
                        pages...
                      </div>
                      <div className="text-primary mt-4 font-semibold">
                        📊 Total: 127 pages indexed, 45.2k words processed
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 2: Document Processing */}
          <div id="document-processing" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["document-processing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <FileText className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    02
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Advanced Document Processing</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Upload PDFs, Word documents, text files, and Markdown to expand your chatbot's knowledge base. Our AI
                  processes and indexes all content for intelligent retrieval with semantic understanding.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="font-semibold">PDF Processing</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="font-semibold">DOCX Support</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Code className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Markdown</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Smart Indexing</span>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  Upload Documents <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Document Library</h4>
                        <Badge className="bg-primary/10 text-primary">12 files processed</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">product-guide.pdf</div>
                              <div className="text-sm text-muted-foreground">2.4 MB • 47 pages</div>
                            </div>
                          </div>
                          <div className="text-green-500 font-semibold">✓ Processed</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">company-policies.docx</div>
                              <div className="text-sm text-muted-foreground">1.8 MB • 23 pages</div>
                            </div>
                          </div>
                          <div className="text-green-500 font-semibold">✓ Processed</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">faq-database.txt</div>
                              <div className="text-sm text-muted-foreground">456 KB • Processing...</div>
                            </div>
                          </div>
                          <div className="text-yellow-500 font-semibold animate-pulse">⏳ Processing</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 3: Multi-turn Conversations */}
          <div id="conversations" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["conversations"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <MessageSquare className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    03
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Intelligent Multi-turn Conversations</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Advanced AI with conversation memory and context understanding. Your chatbot maintains context across
                  multiple exchanges for natural, helpful interactions that feel truly human.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Conversation Memory</h4>
                      <p className="text-sm text-muted-foreground">Remembers context throughout the conversation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Context-aware Responses</h4>
                      <p className="text-sm text-muted-foreground">Understands intent and provides relevant answers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Configurable Personality</h4>
                      <p className="text-sm text-muted-foreground">Customize tone and style to match your brand</p>
                    </div>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  Test Conversations <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Live Conversation</h4>
                        <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5" />
                          </div>
                          <div className="bg-muted rounded-2xl p-4 max-w-sm">
                            <p className="text-sm">What are your pricing plans?</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 justify-end">
                          <div className="bg-primary rounded-2xl p-4 max-w-sm">
                            <p className="text-sm text-primary-foreground">
                              We offer Free, Business ($69/month), and Enterprise plans. Each includes different
                              features and usage limits. Would you like me to explain the differences?
                            </p>
                          </div>
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5" />
                          </div>
                          <div className="bg-muted rounded-2xl p-4 max-w-sm">
                            <p className="text-sm">What's included in the Business plan?</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 justify-end">
                          <div className="bg-primary rounded-2xl p-4 max-w-sm">
                            <p className="text-sm text-primary-foreground">
                              The Business plan includes 5,000 messages/month, 5 chatbots, advanced analytics, live chat
                              handover, and all integrations. Perfect for growing businesses!
                            </p>
                          </div>
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Advanced Capabilities
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Enterprise-Grade Features</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Professional tools for teams and businesses that demand the best
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Track conversations, identify knowledge gaps, and optimize performance with detailed analytics and
                  real-time insights dashboard.
                </p>
                <Button variant="outline" className="bg-transparent">
                  View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Invite team members with role-based permissions. Collaborate on content management and performance
                  monitoring seamlessly.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Manage Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">White-label Customization</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Customize colors, fonts, logos, and branding. Make the chatbot seamlessly match your brand identity
                  and style.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Customize Brand <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Code className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Developer API</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  RESTful API for programmatic access to ingestion, chat, and analytics. Build custom integrations with
                  comprehensive documentation.
                </p>
                <Button variant="outline" className="bg-transparent">
                  API Docs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Webhook className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Webhooks & Integrations</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Connect with Slack, Teams, WhatsApp, and other platforms. Receive webhooks for important events and
                  automate workflows.
                </p>
                <Button variant="outline" className="bg-transparent">
                  View Integrations <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Enterprise Security</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  SOC 2 compliant with end-to-end encryption, audit logs, and enterprise-grade security features for
                  peace of mind.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Security Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Powerful Integrations
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Connect Everything</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Seamlessly integrate with the tools your team already uses and loves
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 rounded-full p-6 w-fit mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Slack Integration</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Forward unanswered queries to Slack channels and receive daily analytics reports directly in your
                  workspace.
                </p>
                <Button className="glow-primary">
                  Connect Slack <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 rounded-full p-6 w-fit mx-auto mb-6">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Microsoft Teams</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Connect with Teams for seamless collaboration and notification management across your organization.
                </p>
                <Button className="glow-primary">
                  Connect Teams <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 rounded-full p-6 w-fit mx-auto mb-6">
                  <Phone className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">WhatsApp Business</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Deploy your chatbot on WhatsApp for customer support on their preferred messaging platform.
                </p>
                <Button className="glow-primary">
                  Connect WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">
              Ready to build the future of <span className="gradient-text">customer communication?</span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-16 text-balance">
              Join thousands of businesses using Neural.ai to provide intelligent, personalized customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 glow-primary rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  Start Building Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 bg-transparent border-border hover:bg-card rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
