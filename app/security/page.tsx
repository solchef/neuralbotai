import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Lock, Eye, Server, Award, CheckCircle } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Shield className="h-4 w-4 mr-2" />
              Security & Compliance
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Enterprise-grade security you can trust
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Your data security is our top priority. Neural.ai implements military-grade encryption and follows
              industry best practices to keep your information safe.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Security Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security measures to protect your data and ensure compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-4" />
                <CardTitle>End-to-End Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All data is encrypted using AES-256 encryption both in transit and at rest, ensuring your information
                  remains secure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Server className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Secure Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our infrastructure is hosted on enterprise-grade cloud providers with 99.9% uptime SLA and automatic
                  backups.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Privacy by Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We collect only the minimum data necessary and never share your information with third parties without
                  consent.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-4" />
                <CardTitle>GDPR Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Full compliance with GDPR, CCPA, and other privacy regulations. Data processing agreements available.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Access Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Role-based access controls, two-factor authentication, and audit logs for all account activities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Regular Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular security audits and penetration testing by third-party security firms to ensure ongoing
                  protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of compliance and security certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-border text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-semibold mb-2">GDPR</h3>
                <p className="text-sm text-muted-foreground">General Data Protection Regulation compliant</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-semibold mb-2">SOC 2</h3>
                <p className="text-sm text-muted-foreground">Type II compliance for security and availability</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="font-semibold mb-2">ISO 27001</h3>
                <p className="text-sm text-muted-foreground">Information security management certified</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="font-semibold mb-2">CCPA</h3>
                <p className="text-sm text-muted-foreground">California Consumer Privacy Act compliant</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Security Practices</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Data Minimization</h3>
                    <p className="text-muted-foreground">
                      We collect and process only the data necessary to provide our services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Regular Updates</h3>
                    <p className="text-muted-foreground">
                      All systems are regularly updated with the latest security patches.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Employee Training</h3>
                    <p className="text-muted-foreground">
                      All team members receive regular security awareness training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Incident Response</h3>
                    <p className="text-muted-foreground">24/7 monitoring with rapid incident response procedures.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-border bg-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Security Contact</h3>
                <p className="text-muted-foreground mb-6">
                  Have a security concern or want to report a vulnerability? Our security team is here to help.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">security@neural.ai</div>
                  </div>
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <div className="text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>
                <Button className="w-full mt-6">Report Security Issue</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to build with confidence?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building secure AI chatbots with Neural.ai's enterprise-grade security and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Get Started Securely
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Contact Security Team
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
