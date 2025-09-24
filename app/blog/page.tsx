import { Header } from "@/components/marketing/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "The Future of AI Customer Support: Trends for 2025",
      excerpt:
        "Explore the latest trends in AI-powered customer support and how businesses are leveraging chatbots to improve customer satisfaction.",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      category: "AI Trends",
      readTime: "5 min read",
    },
    {
      title: "How to Train Your Chatbot for Better Conversations",
      excerpt:
        "Learn best practices for training your AI chatbot to provide more natural and helpful conversations with your customers.",
      author: "Mike Chen",
      date: "January 12, 2025",
      category: "Tutorial",
      readTime: "8 min read",
    },
    {
      title: "Case Study: University of Miami Reduces Support Tickets by 70%",
      excerpt:
        "Discover how the University of Miami implemented Neural.ai to handle student inquiries and dramatically reduced their support workload.",
      author: "Emily Rodriguez",
      date: "January 10, 2025",
      category: "Case Study",
      readTime: "6 min read",
    },
    {
      title: "Multi-language Support: Breaking Down Communication Barriers",
      excerpt:
        "Learn how Neural.ai's 95+ language support helps businesses serve customers globally without language barriers.",
      author: "David Kim",
      date: "January 8, 2025",
      category: "Features",
      readTime: "4 min read",
    },
    {
      title: "Security Best Practices for AI Chatbots",
      excerpt:
        "Essential security considerations when implementing AI chatbots in your business, including data protection and privacy compliance.",
      author: "Lisa Thompson",
      date: "January 5, 2025",
      category: "Security",
      readTime: "7 min read",
    },
    {
      title: "ROI of AI Chatbots: Measuring Success and Impact",
      excerpt:
        "How to measure the return on investment of your AI chatbot implementation and track key performance metrics.",
      author: "Alex Morgan",
      date: "January 3, 2025",
      category: "Business",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="h-4 w-4 mr-2" />
              Neural.ai Blog
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Insights, tutorials, and updates from the Neural.ai team
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
              Stay up-to-date with the latest in AI chatbot technology, best practices, and success stories from our
              community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">
              Featured Post
            </Badge>
            <Card className="border-border overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex items-center">
                  <div>
                    <Badge className="mb-4">AI Trends</Badge>
                    <h2 className="text-3xl font-bold mb-4">The Future of AI Customer Support: Trends for 2025</h2>
                    <p className="text-muted-foreground mb-6">
                      Explore the latest trends in AI-powered customer support and how businesses are leveraging
                      chatbots to improve customer satisfaction and reduce operational costs.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Sarah Johnson
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        January 15, 2025
                      </div>
                      <div>5 min read</div>
                    </div>
                    <Button>
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <div className="text-2xl font-bold text-primary">AI Trends 2025</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights, tutorials, and best practices for building better AI chatbots
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="border-border hover:border-primary/20 transition-colors">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border bg-primary/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest AI chatbot insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
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
