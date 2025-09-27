// "use client"

// import { Header } from "@/components/marketing/header"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import {
//   Brain,
//   Zap,
//   Shield,
//   BarChart3,
//   Users,
//   ArrowRight,
//   MessageSquare,
//   Check,
//   Network,
//   Bot,
//   TrendingUp,
//   Play,
//   Building2,
//   GraduationCap,
//   Plane,
//   University,
// } from "lucide-react"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <section className="relative py-20 lg:py-32 overflow-hidden hero-bg">
//         <div className="absolute inset-0 grid-pattern opacity-30" />
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center max-w-5xl mx-auto">
//             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
//               Build Like a Pro
//             </h1>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-8 leading-tight">
//               With <span className="gradient-text">Intelligent AI Chatbots</span>
//             </h2>
//             <p className="text-xl lg:text-2xl text-muted-foreground text-balance mb-12 max-w-4xl mx-auto leading-relaxed">
//               Create and scale smart communications with fast and flexible solutions that adapt to your business needs.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
//               <Link href="/auth/sign-up">
//                 <Button size="lg" className="text-lg px-10 py-4 glow-primary rounded-full">
//                   Get Started
//                 </Button>
//               </Link>
//               <Link href="/widget-demo">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="text-lg px-10 py-4 bg-transparent border-border hover:bg-card rounded-full flex items-center gap-2"
//                 >
//                   <Play className="h-5 w-5" />
//                   Contact Us
//                 </Button>
//               </Link>
//             </div>

//             <div className="relative max-w-6xl mx-auto">
//               <div className="grid md:grid-cols-3 gap-8 items-center justify-center">
//                 <div className="isometric-container">
//                   <Card className="isometric-card border-border glow-card bg-card/50 backdrop-blur-sm">
//                     <CardContent className="p-8 text-center">
//                       <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                         <MessageSquare className="h-8 w-8 text-primary" />
//                       </div>
//                       <h3 className="font-semibold mb-2">Smart Conversations</h3>
//                       <p className="text-sm text-muted-foreground">AI-powered responses</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <div className="isometric-container">
//                   <Card className="isometric-card border-border glow-card bg-card/50 backdrop-blur-sm">
//                     <CardContent className="p-8 text-center">
//                       <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                         <Network className="h-8 w-8 text-primary" />
//                       </div>
//                       <h3 className="font-semibold mb-2">Multi-Platform</h3>
//                       <p className="text-sm text-muted-foreground">Deploy everywhere</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <div className="isometric-container">
//                   <Card className="isometric-card border-border glow-card bg-card/50 backdrop-blur-sm">
//                     <CardContent className="p-8 text-center">
//                       <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                         <BarChart3 className="h-8 w-8 text-primary" />
//                       </div>
//                       <h3 className="font-semibold mb-2">Analytics</h3>
//                       <p className="text-sm text-muted-foreground">Real-time insights</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <p className="text-lg text-muted-foreground">
//               Powering <span className="text-primary font-semibold">AI Communications</span> and{" "}
//               <span className="text-primary font-semibold">Chatbot Apps</span> for{" "}
//               <span className="text-primary font-semibold">Millions of Users</span> Worldwide
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70">
//             <div className="text-center flex items-center justify-center">
//               <div className="flex items-center gap-2">
//                 <University className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-semibold">University of Miami</span>
//               </div>
//             </div>
//             <div className="text-center flex items-center justify-center">
//               <div className="flex items-center gap-2">
//                 <GraduationCap className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-semibold">University of Puerto Rico</span>
//               </div>
//             </div>
//             <div className="text-center flex items-center justify-center">
//               <div className="flex items-center gap-2">
//                 <Plane className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-semibold">Booking.com</span>
//               </div>
//             </div>
//             <div className="text-center flex items-center justify-center">
//               <div className="flex items-center gap-2">
//                 <Building2 className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-semibold">Maine Public Universities</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
//               AI-based communications for everyone
//             </Badge>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">
//               From Serverless to No-code Communication Applications
//             </h2>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
//                 Neural.ai Platform
//               </Badge>
//               <h3 className="text-3xl font-bold mb-6">The Most Powerful AI Communications Platform</h3>
//               <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
//                 Add voice, video messaging, natural language processing, & real-time communications full-stack
//                 solutions. Streamline Platform provides an integrated communications development experience that
//                 includes online documentation, SDKs and APIs for any platform.
//               </p>
//               <Button className="glow-primary">
//                 Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//             <div className="relative">
//               <Card className="border-border glow-card bg-card">
//                 <CardContent className="p-0">
//                   <div className="bg-primary/5 p-4 border-b border-border">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                       <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       <span className="text-sm text-muted-foreground ml-4">Neural.ai Chatbot Builder</span>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
//                           <Bot className="h-4 w-4 text-primary" />
//                         </div>
//                         <div className="bg-muted rounded-lg p-3 max-w-xs">
//                           <p className="text-sm">Hello! How can I help you today?</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3 justify-end">
//                         <div className="bg-primary rounded-lg p-3 max-w-xs">
//                           <p className="text-sm text-primary-foreground">I need help with my account</p>
//                         </div>
//                         <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
//                           <Users className="h-4 w-4" />
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
//                           <Bot className="h-4 w-4 text-primary" />
//                         </div>
//                         <div className="bg-muted rounded-lg p-3 max-w-xs">
//                           <p className="text-sm">I'd be happy to help! Let me connect you with our support team...</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="relative">
//               <Card className="border-border glow-card bg-card">
//                 <CardContent className="p-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-semibold">Chatbot Analytics</h4>
//                       <Badge variant="secondary" className="bg-primary/10 text-primary">
//                         Live
//                       </Badge>
//                     </div>
//                     <div className="grid grid-cols-3 gap-4">
//                       <div className="text-center p-4 bg-muted/50 rounded-lg">
//                         <div className="text-2xl font-bold text-primary">1,247</div>
//                         <div className="text-xs text-muted-foreground">Conversations</div>
//                       </div>
//                       <div className="text-center p-4 bg-muted/50 rounded-lg">
//                         <div className="text-2xl font-bold text-primary">98%</div>
//                         <div className="text-xs text-muted-foreground">Satisfaction</div>
//                       </div>
//                       <div className="text-center p-4 bg-muted/50 rounded-lg">
//                         <div className="text-2xl font-bold text-primary">24/7</div>
//                         <div className="text-xs text-muted-foreground">Uptime</div>
//                       </div>
//                     </div>
//                     <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
//                       <TrendingUp className="h-8 w-8 text-primary" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//             <div>
//               <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
//                 Visual Contact Center Builder
//               </Badge>
//               <h3 className="text-3xl font-bold mb-6">Neural.ai Kit</h3>
//               <h4 className="text-xl font-semibold mb-4">No-Code Drag and Drop Contact Center</h4>
//               <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
//                 Streamline is a web-based application using the Voximplant platform that allows you to create a contact
//                 center in just a few minutes. It can answer any call, get a call to a Conference Bridge, it can
//                 integrate with your contact center & it can integrate with your CRM.
//               </p>
//               <Button className="glow-primary">
//                 Explore Kit <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
//               Tailor-made Communication technology solutions
//             </Badge>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">For Every Industry</h2>
//             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//               With over 30,000 customers globally, Neural.ai has proven experience in creating technology to improve
//               business communications.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <MessageSquare className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   24/7 intelligent support with context-aware responses and seamless human handover.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <TrendingUp className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Sales Automation</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Intelligent lead qualification and personalized product recommendations.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <GraduationCap className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Education</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Personalized learning assistance and instant Q&A for students and faculty.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <Building2 className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Internal knowledge retrieval and automated workflows for large organizations.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <Plane className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Travel & Hospitality</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Booking assistance and customer service across multiple languages.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
//               <CardContent className="p-8">
//                 <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
//                   <Shield className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Healthcare</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Secure patient communication and appointment scheduling with HIPAA compliance.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-4xl mx-auto">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">
//               Ready to transform your business with <span className="gradient-text">intelligent communication?</span>
//             </h2>
//             <p className="text-xl text-muted-foreground mb-12 text-balance">
//               Empower your entire organization to create at the speed of thought, while ensuring security remains at the
//               forefront.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-6 justify-center">
//               <Link href="/auth/sign-up">
//                 <Button size="lg" className="text-lg px-10 py-4 glow-primary rounded-full">
//                   Contact Sales
//                 </Button>
//               </Link>
//               <Link href="/widget-demo">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="text-lg px-10 py-4 bg-transparent border-border hover:bg-card rounded-full flex items-center gap-2"
//                 >
//                   <Play className="h-5 w-5" />
//                   Watch Demo
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Preview */}
//       <section className="py-24 border-t border-border">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
//               <Zap className="h-4 w-4 mr-2" />
//               Pricing Plans
//             </Badge>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Simple, transparent pricing</h2>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
//               Start free and scale as you grow. No hidden fees, no surprises. Choose the plan that fits your business
//               needs.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             <Card className="border-border glow-card">
//               <CardContent className="p-8">
//                 <div className="text-center mb-8">
//                   <h3 className="text-2xl font-bold mb-4">Free</h3>
//                   <div className="text-5xl font-bold mb-2">$0</div>
//                   <div className="text-muted-foreground">per month</div>
//                 </div>
//                 <ul className="space-y-4 mb-8">
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>1 chatbot</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>50 messages/month</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>500k characters</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Basic integrations</span>
//                   </li>
//                 </ul>
//                 <Button variant="outline" className="w-full bg-transparent">
//                   Get Started
//                 </Button>
//               </CardContent>
//             </Card>

//             <Card className="border-primary glow-primary relative">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
//               </div>
//               <CardContent className="p-8">
//                 <div className="text-center mb-8">
//                   <h3 className="text-2xl font-bold mb-4">Business</h3>
//                   <div className="text-5xl font-bold mb-2">$69</div>
//                   <div className="text-muted-foreground">per month</div>
//                 </div>
//                 <ul className="space-y-4 mb-8">
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>5 chatbots</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>5,000 messages/month</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>15M characters</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Live chat handover</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Advanced analytics</span>
//                   </li>
//                 </ul>
//                 <Button className="w-full">Start Free Trial</Button>
//               </CardContent>
//             </Card>

//             <Card className="border-border glow-card">
//               <CardContent className="p-8">
//                 <div className="text-center mb-8">
//                   <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
//                   <div className="text-5xl font-bold mb-2">Custom</div>
//                   <div className="text-muted-foreground">pricing</div>
//                 </div>
//                 <ul className="space-y-4 mb-8">
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Unlimited chatbots</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Unlimited messages</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>White-label solution</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Priority support</span>
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                     <span>Custom integrations</span>
//                   </li>
//                 </ul>
//                 <Button variant="outline" className="w-full bg-transparent">
//                   Contact Sales
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="text-center mt-12">
//             <Link href="/pricing">
//               <Button variant="outline" size="lg" className="bg-transparent">
//                 View all plans and features
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Brain className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-bold">Neural.ai</span>
//               </div>
//               <p className="text-muted-foreground">Create intelligent, branded, and secure chatbots without coding.</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Product</h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>
//                   <Link href="/features">Features</Link>
//                 </li>
//                 <li>
//                   <Link href="/pricing">Pricing</Link>
//                 </li>
//                 <li>
//                   <Link href="/docs">Documentation</Link>
//                 </li>
//                 <li>
//                   <Link href="/api">API</Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Company</h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>
//                   <Link href="/about">About</Link>
//                 </li>
//                 <li>
//                   <Link href="/blog">Blog</Link>
//                 </li>
//                 <li>
//                   <Link href="/careers">Careers</Link>
//                 </li>
//                 <li>
//                   <Link href="/contact">Contact</Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Legal</h3>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li>
//                   <Link href="/privacy">Privacy</Link>
//                 </li>
//                 <li>
//                   <Link href="/terms">Terms</Link>
//                 </li>
//                 <li>
//                   <Link href="/security">Security</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
//             <p>&copy; 2025 Neural.ai. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

"use client"

import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Brain,
  Zap,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  MessageSquare,
  Check,
  Network,
  Bot,
  TrendingUp,
  Play,
  Building2,
  GraduationCap,
  Plane,
  University,
  Globe,
  Calendar,
  Search,
  Megaphone,
  Video,
  UserCheck,
  Target,
  Sparkles,
  ChevronDown,
  Settings,
} from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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
      "smart-conversations",
      "multi-channel",
      "content-management",
      "lead-generation",
      "seo-growth",
      "analytics",
      "content-calendar",
      "seo-assistant",
      "ad-manager",
      "omnichannel-hub",
      "voice-video",
      "ai-assistant",
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
                Neural.ai — One Platform, Infinite Possibilities
              </Badge>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-balance mb-8 leading-tight">
                Build Like a Pro
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-8 leading-tight">
                With <span className="gradient-text">Intelligent AI Chatbots</span>
              </h2>
              <p className="text-2xl lg:text-3xl text-muted-foreground text-balance mb-16 max-w-5xl mx-auto leading-relaxed">
                The Ultimate AI Communication & Growth Platform — automate interactions, scale engagement, and grow
                revenue from a single, intelligent hub.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 glow-primary rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  Start Building Free
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 bg-transparent border-border hover:bg-card rounded-full flex items-center gap-3 transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="h-6 w-6" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6 items-center justify-center">
                {[
                  { icon: <MessageSquare className="h-8 w-8 text-green-400" />, title: "Smart Conversations", desc: "AI-powered responses" },
                  { icon: <Network className="h-8 w-8 text-green-400" />, title: "Multi-Platform", desc: "Deploy everywhere" },
                  { icon: <BarChart3 className="h-8 w-8 text-green-400" />, title: "Analytics", desc: "Real-time insights" },
                  // { icon: <Shield className="h-8 w-8 text-green-400" />, title: "Security", desc: "Enterprise-grade protection" },
                  // { icon: <Zap className="h-8 w-8 text-green-400" />, title: "Fast Performance", desc: "Lightning quick" },
                  { icon: <Settings className="h-8 w-8 text-green-400" />, title: "Customizable", desc: "Fully adaptable" },
                ].map((item, idx) => (
                  <div key={idx} className="isometric-container">
                    <Card className="isometric-card border-border glow-card bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-8 text-center">
                        <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}

              </div>
            </div>
            {/* Animated scroll indicator */}
            {/* <div className="flex justify-center">
              <div className="animate-bounce">
                <ChevronDown className="h-8 w-8 text-primary" />
              </div>
            </div> */}

          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-2xl text-muted-foreground">
              Powering <span className="text-primary font-semibold">AI Communications</span> for{" "}
              <span className="text-primary font-semibold">30,000+ Customers</span> Worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70">
            <div className="text-center flex items-center justify-center transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-3">
                <University className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">University of Miami</span>
              </div>
            </div>
            <div className="text-center flex items-center justify-center transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">University of Puerto Rico</span>
              </div>
            </div>
            <div className="text-center flex items-center justify-center transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Plane className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">Booking.com</span>
              </div>
            </div>
            <div className="text-center flex items-center justify-center transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">Maine Public Universities</span>
              </div>
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
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Smart Communication for All</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Removing friction between businesses and their audiences with intelligent automation
            </p>
          </div>

          {/* Feature 1: Smart Conversations */}
          <div id="smart-conversations" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["smart-conversations"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <MessageSquare className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    01
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Smart Conversations Everywhere</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  AI Chatbots that understand context, intent, and sentiment to deliver human-like responses.
                  Multi-language support for global customer engagement with intelligent human handover for complex
                  queries.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Context-aware AI responses
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Multi-language support
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-primary mr-4" />
                    Seamless human handover
                  </li>
                </ul>
                <Button className="glow-primary text-lg px-8 py-4">
                  Explore Smart Conversations <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-0">
                    <div className="bg-primary/5 p-6 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-lg text-muted-foreground ml-4">Neural.ai Smart Chat</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Bot className="h-6 w-6 text-primary" />
                          </div>
                          <div className="bg-muted rounded-2xl p-4 max-w-sm">
                            <p className="text-lg">
                              Hello! I understand you're looking for product recommendations. Based on your previous
                              purchases, I can suggest some great options. What's your budget range?
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 justify-end">
                          <div className="bg-primary rounded-2xl p-4 max-w-sm">
                            <p className="text-lg text-primary-foreground">
                              Around $200-300, and I prefer eco-friendly options
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Bot className="h-6 w-6 text-primary" />
                          </div>
                          <div className="bg-muted rounded-2xl p-4 max-w-sm">
                            <p className="text-lg">
                              Perfect! I found 3 eco-friendly products in your range. The EcoTech Pro has excellent
                              reviews and fits your sustainability values. Would you like me to show you the details or
                              connect you with our sustainability expert?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 2: Multi-Channel Engagement */}
          <div id="multi-channel" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["multi-channel"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Network className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    02
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Multi-Channel Engagement</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Seamlessly integrate your chatbot across websites, WhatsApp, Telegram, Instagram, Facebook, SMS,
                  Email, and custom APIs. One chatbot, deployed everywhere without repetitive integration.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Websites</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="font-semibold">WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Social Media</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Network className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Custom APIs</span>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  View All Integrations <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-green-500" />
                      </div>
                      <h4 className="font-semibold mb-2">WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">2.8B users</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500 mt-8">
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                      <h4 className="font-semibold mb-2">Facebook</h4>
                      <p className="text-sm text-muted-foreground">3B users</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                    <CardContent className="p-6 text-center">
                      <div className="bg-purple-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <Globe className="h-8 w-8 text-purple-500" />
                      </div>
                      <h4 className="font-semibold mb-2">Website</h4>
                      <p className="text-sm text-muted-foreground">Universal</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500 mt-8">
                    <CardContent className="p-6 text-center">
                      <div className="bg-cyan-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <Network className="h-8 w-8 text-cyan-500" />
                      </div>
                      <h4 className="font-semibold mb-2">Telegram</h4>
                      <p className="text-sm text-muted-foreground">800M users</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: AI Content Management */}
          <div id="content-management" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["content-management"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Sparkles className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    03
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">AI-Driven Content Management</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Auto-generate website posts, blogs, and product updates. Schedule and publish content automatically at
                  custom frequencies across all integrated social media channels.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Auto-generate Content</h4>
                      <p className="text-sm text-muted-foreground">Blogs, posts, and updates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Smart Scheduling</h4>
                      <p className="text-sm text-muted-foreground">Custom frequencies and timing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Network className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Cross-platform Publishing</h4>
                      <p className="text-sm text-muted-foreground">All social channels at once</p>
                    </div>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  Try Content AI <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Content Calendar</h4>
                        <Badge className="bg-primary/10 text-primary">AI Generated</Badge>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        <div className="font-semibold p-2">Mon</div>
                        <div className="font-semibold p-2">Tue</div>
                        <div className="font-semibold p-2">Wed</div>
                        <div className="font-semibold p-2">Thu</div>
                        <div className="font-semibold p-2">Fri</div>
                        <div className="font-semibold p-2">Sat</div>
                        <div className="font-semibold p-2">Sun</div>
                        <div className="p-2 bg-primary/10 rounded text-primary font-semibold">Blog</div>
                        <div className="p-2"></div>
                        <div className="p-2 bg-blue-500/10 rounded text-blue-500 font-semibold">Social</div>
                        <div className="p-2"></div>
                        <div className="p-2 bg-green-500/10 rounded text-green-500 font-semibold">Email</div>
                        <div className="p-2"></div>
                        <div className="p-2 bg-purple-500/10 rounded text-purple-500 font-semibold">Video</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">AI Blog: "10 Ways to Improve Customer Engagement"</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Social Post: "Customer success story highlight"</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Email Campaign: "Weekly product updates"</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 4: Lead Generation */}
          <div id="lead-generation" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["lead-generation"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    04
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Lead Generation & Conversion</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  AI chatbots that capture leads through natural conversation. Lead qualification and enrichment in real
                  time with CRM integration and personalized follow-ups based on lead behavior.
                </p>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Smart Lead Capture</h4>
                      <p className="text-sm text-muted-foreground">Natural conversation-based qualification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Real-time Enrichment</h4>
                      <p className="text-sm text-muted-foreground">Automatic lead scoring and data enhancement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Network className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">CRM Integration</h4>
                      <p className="text-sm text-muted-foreground">Seamless pipeline management</p>
                    </div>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  Boost Conversions <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Lead Pipeline</h4>
                        <Badge className="bg-green-500/10 text-green-500">+127% this month</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-semibold">New Leads</span>
                          </div>
                          <span className="text-2xl font-bold text-blue-500">847</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-semibold">Qualified</span>
                          </div>
                          <span className="text-2xl font-bold text-yellow-500">423</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-semibold">Converted</span>
                          </div>
                          <span className="text-2xl font-bold text-green-500">156</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Conversion Rate</span>
                          <span className="text-lg font-bold text-primary">36.9%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 5: SEO & Website Growth */}
          <div id="seo-growth" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["seo-growth"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Search className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    05
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">SEO & Website Growth</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  AI-powered SEO suggestions for site content and metadata. Automated keyword optimization, content
                  analysis, and integration with Google Search Console for reach and ranking analytics.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AI SEO Analysis</h4>
                      <p className="text-sm text-muted-foreground">Smart content and metadata optimization</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Keyword Optimization</h4>
                      <p className="text-sm text-muted-foreground">Automated keyword research and implementation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/20 rounded-full p-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Google Integration</h4>
                      <p className="text-sm text-muted-foreground">Search Console analytics and insights</p>
                    </div>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  Improve SEO Score <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">SEO Dashboard</h4>
                        <Badge className="bg-green-500/10 text-green-500">Score: 94/100</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Content Quality</span>
                            <span className="text-sm text-primary">98%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Keyword Optimization</span>
                            <span className="text-sm text-primary">92%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Technical SEO</span>
                            <span className="text-sm text-primary">89%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "89%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">+247%</div>
                            <div className="text-xs text-muted-foreground">Organic Traffic</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">1,847</div>
                            <div className="text-xs text-muted-foreground">Keywords Ranking</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Feature 6: Analytics & Insights */}
          <div id="analytics" className="mb-32">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["analytics"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary/20 rounded-full p-4">
                    <BarChart3 className="h-12 w-12 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                    06
                  </Badge>
                </div>
                <h3 className="text-4xl font-bold mb-6">Analytics & Insights</h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Unified dashboard with real-time insights across all channels. Chatbot performance metrics, social
                  media analytics, and custom reports for deeper strategy analysis.
                </p>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Real-time Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Live metrics across all channels</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Performance Tracking</h4>
                      <p className="text-sm text-muted-foreground">Conversations, satisfaction, response time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Custom Reports</h4>
                      <p className="text-sm text-muted-foreground">Detailed strategy analysis and insights</p>
                    </div>
                  </div>
                </div>
                <Button className="glow-primary text-lg px-8 py-4">
                  View Analytics <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <Card className="border-border glow-card bg-card transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Unified Analytics</h4>
                        <Badge className="bg-primary/10 text-primary">Live</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary">12.4K</div>
                          <div className="text-xs text-muted-foreground">Conversations</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary">97%</div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary">1.2s</div>
                          <div className="text-xs text-muted-foreground">Avg Response</div>
                        </div>
                      </div>
                      <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"></div>
                        <TrendingUp className="h-16 w-16 text-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span>Website: 45%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>WhatsApp: 32%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Social: 18%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>Email: 5%</span>
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

      {/* Advanced Features Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Advanced AI Features
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Next-Generation Capabilities</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Cutting-edge AI tools that transform how businesses operate and grow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-32">
            {/* Advanced Feature 7: AI Content Calendar */}
            <div
              id="content-calendar"
              className={`transition-all duration-1000 ${isVisible["content-calendar"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      07
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Content Calendar</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Automatically generate a content calendar tailored to your business and audience. AI suggests blog
                    ideas, social media topics, and campaign plans based on trending keywords and competitor analysis.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>AI-generated content ideas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Trending keyword analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Competitor insights</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    Generate Calendar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Feature 8: Dynamic SEO Assistant */}
            <div
              id="seo-assistant"
              className={`transition-all duration-1000 ${isVisible["seo-assistant"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      08
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Dynamic SEO Assistant</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A real-time SEO advisor that helps businesses rank higher. Competitor analysis for keywords,
                    AI-driven SEO score, and recommendations for improving visibility and engagement.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Real-time SEO scoring</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Competitor keyword analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Visibility optimization</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    Boost Rankings <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Feature 9: AI Ad Campaign Manager */}
            <div
              id="ad-manager"
              className={`transition-all duration-1000 ${isVisible["ad-manager"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Megaphone className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      09
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Ad Campaign Manager</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Create and optimize paid campaigns automatically. AI generates ad copy tailored to your audience
                    with auto-targeting and real-time performance optimization across Google Ads, Facebook, Instagram,
                    and more.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>AI-generated ad copy</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Smart audience targeting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Real-time optimization</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    Launch Campaigns <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Feature 10: Omnichannel Analytics Hub */}
            <div
              id="omnichannel-hub"
              className={`transition-all duration-1000 ${isVisible["omnichannel-hub"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      10
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Omnichannel Analytics Hub</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    One dashboard to rule all analytics. Combine website analytics, chatbot performance data, and social
                    media insights. Track campaigns, reach, engagement, and conversions from one place.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Unified analytics dashboard</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Cross-platform insights</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Exportable reports</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Feature 11: Voice & Video Chatbots */}
            <div
              id="voice-video"
              className={`transition-all duration-1000 ${isVisible["voice-video"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Video className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      11
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Voice & Video Chatbots</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Take communication to the next level. AI agents that respond via voice and video with support for
                    voice commands, multimedia responses, and integration with voice assistants.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Voice-enabled AI agents</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Video response capabilities</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Voice assistant integration</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    Try Voice AI <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Feature 12: AI Personal Assistant */}
            <div
              id="ai-assistant"
              className={`transition-all duration-1000 ${isVisible["ai-assistant"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="border-border glow-card bg-card h-full transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      12
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Personal Assistant</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Your AI co-pilot for managing business growth. Dashboard assistant for task management,
                    recommendations for content creation, SEO, lead engagement, and automated reminders for important
                    metrics.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Intelligent task management</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Growth recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span>Automated alerts & reminders</span>
                    </li>
                  </ul>
                  <Button className="glow-primary">
                    Meet Your Assistant <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              Industry Solutions
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">For Every Industry</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Neural.ai empowers organizations across industries to innovate and scale with intelligent communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">E-commerce & Retail</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Personalized shopping assistance, automated support, and intelligent product recommendations that
                  drive sales.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Education</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Student engagement, AI tutoring, and personalized learning assistance for educational institutions.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Plane className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Travel & Hospitality</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Multilingual booking assistance, customer service, and personalized travel recommendations.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Healthcare</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Secure patient communication, appointment scheduling, and HIPAA-compliant automated assistance.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Internal knowledge retrieval, workflow automation, and scalable communication for large organizations.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card hover:border-primary/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-6">
                  <Megaphone className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Agencies</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  One comprehensive tool to manage client communications, campaigns, and growth strategies efficiently.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
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
              Ready to transform your business with <span className="gradient-text">intelligent communication?</span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-16 text-balance">
              Join 30,000+ businesses already using Neural.ai to automate interactions, scale engagement, and grow
              revenue.
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
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 bg-transparent border-border hover:bg-card rounded-full flex items-center gap-3 transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="h-6 w-6" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              <Zap className="h-5 w-5 mr-2" />
              Pricing Plans
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">Simple, transparent pricing</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border glow-card transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold mb-6">Free</h3>
                  <div className="text-6xl font-bold mb-4">$0</div>
                  <div className="text-xl text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">1 chatbot</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">50 messages/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">500k characters</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Basic integrations</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent text-lg py-4">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary glow-primary relative transform hover:scale-105 transition-all duration-500">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground text-lg px-6 py-2">Most Popular</Badge>
              </div>
              <CardContent className="p-10">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold mb-6">Business</h3>
                  <div className="text-6xl font-bold mb-4">$69</div>
                  <div className="text-xl text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">5 chatbots</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">5,000 messages/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">15M characters</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Live chat handover</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Advanced analytics</span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-4">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-border glow-card transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold mb-6">Enterprise</h3>
                  <div className="text-6xl font-bold mb-4">Custom</div>
                  <div className="text-xl text-muted-foreground">pricing</div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Unlimited chatbots</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Unlimited messages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <span className="text-lg">Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent text-lg py-4">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="bg-transparent text-lg px-8 py-4">
                View all plans and features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Neural.ai</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The Ultimate AI Communication & Growth Platform — One Platform, Infinite Possibilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-primary transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-primary transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p className="text-lg">&copy; 2025 Neural.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

