import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <MessageSquare className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">We'd love to hear from you</h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Have questions about Neural.ai? Need help getting started? Our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input placeholder="Your Company" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea placeholder="Tell us more about your needs..." className="min-h-[120px]" />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help you build amazing AI chatbots. Reach out to us through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">support@neural.ai</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Available on our website</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM GMT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Headquarters</h3>
                    <p className="text-muted-foreground">Great Britain</p>
                    <p className="text-sm text-muted-foreground">Serving customers worldwide</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9 AM - 6 PM GMT</p>
                    <p className="text-sm text-muted-foreground">Emergency support available 24/7</p>
                  </div>
                </div>
              </div>

              <Card className="border-border bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Enterprise Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Need dedicated support for your organization? Our enterprise team provides priority assistance and
                    custom solutions.
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    Contact Enterprise Sales
                  </Button>
                </CardContent>
              </Card>
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
