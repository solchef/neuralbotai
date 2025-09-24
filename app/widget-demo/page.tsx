import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WidgetDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Widget Demo
            </Badge>
            <h1 className="text-3xl font-bold mb-2">ChatBot AI Widget Demo</h1>
            <p className="text-muted-foreground">
              This page demonstrates how the ChatBot AI widget appears on a website. The chat widget is embedded in the
              bottom-right corner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>About Our Company</CardTitle>
                <CardDescription>Learn more about what we do</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We are a leading technology company focused on creating innovative solutions for businesses worldwide.
                  Our team of experts works tirelessly to deliver cutting-edge products and services.
                </p>
                <p className="text-muted-foreground">
                  Founded in 2020, we have grown to serve over 10,000 customers across 50 countries. Our mission is to
                  make technology accessible and useful for everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
                <CardDescription>What we offer to our clients</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AI-powered chatbot solutions</li>
                  <li>• Custom software development</li>
                  <li>• Cloud infrastructure management</li>
                  <li>• Data analytics and insights</li>
                  <li>• 24/7 technical support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: support@example.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
                  <p>Hours: Monday - Friday, 9 AM - 6 PM PST</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Try the Chat Widget</CardTitle>
                <CardDescription>Test our AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Look for the chat button in the bottom-right corner of your screen. Click it to start a conversation
                  with our AI assistant.
                </p>
                <p className="text-muted-foreground">
                  The widget is fully customizable and can be styled to match your brand colors and messaging.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about our services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How do I get started?</h4>
                  <p className="text-muted-foreground">
                    Simply sign up for an account and follow our quick setup guide. You can have your chatbot running in
                    under 10 minutes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What kind of support do you offer?</h4>
                  <p className="text-muted-foreground">
                    We provide 24/7 technical support via email and chat. Premium customers also get phone support and
                    dedicated account management.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I customize the chatbot?</h4>
                  <p className="text-muted-foreground">
                    Yes! You can customize the appearance, behavior, and responses of your chatbot to match your brand
                    and business needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Widget Script - In a real implementation, this would be added by the customer */}
      <script
        src="/widget.js"
        data-site-id="demo-site-id"
        data-token="demo-token"
        async
        dangerouslySetInnerHTML={{
          __html: "",
        }}
      />
    </div>
  )
}
