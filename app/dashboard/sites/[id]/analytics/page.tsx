"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { MessageSquare, Users, Clock, TrendingUp, ThumbsUp, ThumbsDown, Download } from "lucide-react"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function SiteAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)

  // useEffect(() => {
  //   fetchAnalytics()
  // }, [siteId, timeRange])

  // const fetchAnalytics = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch(`/api/sites/${siteId}/analytics?range=${timeRange}`)
  //     const data = await response.json()
  //     setAnalytics(data)
  //   } catch (error) {
  //     console.error("Failed to fetch analytics:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const conversationData = [
    { date: "2024-01-01", conversations: 45, messages: 180 },
    { date: "2024-01-02", conversations: 52, messages: 208 },
    { date: "2024-01-03", conversations: 38, messages: 152 },
    { date: "2024-01-04", conversations: 61, messages: 244 },
    { date: "2024-01-05", conversations: 49, messages: 196 },
    { date: "2024-01-06", conversations: 55, messages: 220 },
    { date: "2024-01-07", conversations: 67, messages: 268 },
  ]

  const satisfactionData = [
    { name: "Very Satisfied", value: 45, color: "#10b981" },
    { name: "Satisfied", value: 32, color: "#3b82f6" },
    { name: "Neutral", value: 15, color: "#f59e0b" },
    { name: "Dissatisfied", value: 8, color: "#ef4444" },
  ]

  const topQuestions = [
    { question: "What are your business hours?", count: 156, category: "General" },
    { question: "How do I reset my password?", count: 134, category: "Account" },
    { question: "What is your return policy?", count: 98, category: "Support" },
    { question: "Do you offer international shipping?", count: 87, category: "Shipping" },
    { question: "How can I contact customer support?", count: 76, category: "Support" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.3s</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Trends</CardTitle>
                <CardDescription>Daily conversation and message volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversations" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
                <CardDescription>Feedback distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Questions</CardTitle>
              <CardDescription>Most frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuestions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{item.category}</Badge>
                        <span className="text-sm text-muted-foreground">{item.count} times</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Details</CardTitle>
              <CardDescription>Detailed conversation metrics and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversations" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Breakdown</CardTitle>
                <CardDescription>User feedback over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {satisfactionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.value}%</span>
                        {item.name.includes("Satisfied") ? (
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                        ) : item.name === "Dissatisfied" ? (
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest user comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Very helpful!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The chatbot answered my question about shipping immediately. Great experience!"
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Quick response</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Got the information I needed without waiting for human support."
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Could be better</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The bot didn't understand my specific question about returns."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Automated analysis of your chatbot performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Peak Usage Hours</h4>
                    <p className="text-sm text-blue-700">
                      Your chatbot receives the most traffic between 2-4 PM EST. Consider optimizing response times
                      during these hours.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Top Performing Content</h4>
                    <p className="text-sm text-green-700">
                      Questions about business hours and contact information have 95% satisfaction rates. Your FAQ
                      content is well-optimized.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Improvement Opportunity</h4>
                    <p className="text-sm text-yellow-700">
                      Technical support questions have lower satisfaction. Consider adding more detailed troubleshooting
                      content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Suggested actions to improve performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div>
                      <h5 className="font-medium">Add More FAQ Content</h5>
                      <p className="text-sm text-muted-foreground">
                        15% of questions couldn't be answered. Consider expanding your knowledge base.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <div>
                      <h5 className="font-medium">Optimize Response Templates</h5>
                      <p className="text-sm text-muted-foreground">
                        Personalize responses for returning visitors to improve engagement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <h5 className="font-medium">Enable Handoff to Human</h5>
                      <p className="text-sm text-muted-foreground">
                        Complex queries would benefit from seamless transfer to human agents.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
