import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Code, Key, Zap, Shield, Globe, ArrowRight } from "lucide-react"

export default function APIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Code className="h-4 w-4 mr-2" />
              Neural.ai API
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Build powerful integrations with our REST API
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Integrate Neural.ai's AI chatbot capabilities directly into your applications with our comprehensive REST
              API and SDKs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get API Key <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">API Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate AI chatbots into your applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <Key className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Simple Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure API key authentication with rate limiting and usage tracking built-in.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Real-time Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant AI responses with low latency and high availability worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Military-grade encryption and GDPR compliance for all API communications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Global CDN</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fast response times worldwide with our globally distributed infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Multiple SDKs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Official SDKs for JavaScript, Python, PHP, and more programming languages.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Webhooks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time notifications for conversations, leads, and chatbot events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with the Neural.ai API in just a few lines of code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Send a message to your chatbot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary/50 p-6 rounded-lg overflow-x-auto text-sm">
                  <code>{`curl -X POST https://api.neural.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "chatbot_id": "your-chatbot-id",
    "message": "Hello, how can you help me?",
    "user_id": "user-123"
  }'`}</code>
                </pre>
              </CardContent>
            </Card>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">JavaScript SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary/50 p-4 rounded text-sm overflow-x-auto">
                    <code>{`import { NeuralAI } from '@neural-ai/sdk';

const client = new NeuralAI('YOUR_API_KEY');

const response = await client.chat({
  chatbotId: 'your-chatbot-id',
  message: 'Hello!',
  userId: 'user-123'
});`}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Python SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary/50 p-4 rounded text-sm overflow-x-auto">
                    <code>{`from neural_ai import NeuralAI

client = NeuralAI('YOUR_API_KEY')

response = client.chat(
    chatbot_id='your-chatbot-id',
    message='Hello!',
    user_id='user-123'
)`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">API Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent pricing based on API usage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="text-2xl font-bold mb-2">Free Tier</div>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <div className="text-muted-foreground">per month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 mb-6">
                  <li>1,000 API calls/month</li>
                  <li>Basic support</li>
                  <li>Rate limit: 10 req/min</li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <Badge className="mx-auto mb-2">Most Popular</Badge>
                <CardTitle className="text-center">
                  <div className="text-2xl font-bold mb-2">Pro</div>
                  <div className="text-4xl font-bold mb-2">$49</div>
                  <div className="text-muted-foreground">per month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 mb-6">
                  <li>50,000 API calls/month</li>
                  <li>Priority support</li>
                  <li>Rate limit: 100 req/min</li>
                  <li>Webhooks included</li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="text-2xl font-bold mb-2">Enterprise</div>
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <div className="text-muted-foreground">pricing</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 mb-6">
                  <li>Unlimited API calls</li>
                  <li>Dedicated support</li>
                  <li>Custom rate limits</li>
                  <li>SLA guarantee</li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to integrate?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building with the Neural.ai API today and bring AI chatbots to your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Get API Key
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Read Documentation
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
