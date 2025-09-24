"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Bot, User, RotateCcw, Download, Clock, ThumbsUp, ThumbsDown, Zap } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "bot"
  content: string
  timestamp: Date
  confidence?: number
  responseTime?: number
}

export default function TestBotPage() {
  const params = useParams()
  const siteId = params.id as string

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hello! I'm Neural Assistant. How can I help you today?",
      timestamp: new Date(),
      confidence: 1.0,
      responseTime: 0.8,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [testScenario, setTestScenario] = useState("general")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Test scenarios
  const testScenarios = {
    general: ["What services do you offer?", "How can I contact support?", "What are your business hours?"],
    technical: [
      "How do I integrate the API?",
      "What programming languages do you support?",
      "Can you help with troubleshooting?",
    ],
    billing: ["What are your pricing plans?", "How do I upgrade my account?", "Can I get a refund?"],
    edge: ["Tell me a joke", "What's the weather like?", "Can you help me with something unrelated?"],
  }

  const stats = {
    totalMessages: messages.length,
    avgResponseTime:
      messages.filter((m) => m.sender === "bot" && m.responseTime).reduce((acc, m) => acc + (m.responseTime || 0), 0) /
        messages.filter((m) => m.sender === "bot" && m.responseTime).length || 0,
    avgConfidence:
      messages.filter((m) => m.sender === "bot" && m.confidence).reduce((acc, m) => acc + (m.confidence || 0), 0) /
        messages.filter((m) => m.sender === "bot" && m.confidence).length || 0,
    successRate: 0.94,
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const simulateBotResponse = async (userMessage: string): Promise<Message> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Mock responses based on keywords
    let response = "I understand your question. Let me help you with that."
    let confidence = 0.8

    if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost")) {
      response =
        "Our pricing starts at $29/month for the Basic plan, $99/month for Pro, and we offer custom Enterprise solutions. Would you like to know more about any specific plan?"
      confidence = 0.95
    } else if (userMessage.toLowerCase().includes("support") || userMessage.toLowerCase().includes("help")) {
      response =
        "You can reach our support team 24/7 through live chat, email at support@neural.ai, or by calling 1-800-NEURAL. How can I assist you right now?"
      confidence = 0.92
    } else if (userMessage.toLowerCase().includes("api") || userMessage.toLowerCase().includes("integration")) {
      response =
        "Our API is RESTful and supports multiple programming languages. You can find detailed documentation at docs.neural.ai. Would you like me to guide you through the integration process?"
      confidence = 0.88
    } else if (userMessage.toLowerCase().includes("joke")) {
      response = "Why don't AI assistants ever get tired? Because they run on cloud computing! ☁️"
      confidence = 0.6
    } else if (userMessage.toLowerCase().includes("weather")) {
      response =
        "I don't have access to real-time weather data, but I'd be happy to help you with questions about Neural.ai's services instead!"
      confidence = 0.4
    }

    return {
      id: Date.now().toString(),
      sender: "bot",
      content: response,
      timestamp: new Date(),
      confidence: confidence,
      responseTime: 1 + Math.random() * 2,
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const botResponse = await simulateBotResponse(inputMessage)
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "bot",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        confidence: 0.0,
        responseTime: 0,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickTest = (question: string) => {
    setInputMessage(question)
  }

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        content: "Hello! I'm Neural Assistant. How can I help you today?",
        timestamp: new Date(),
        confidence: 1.0,
        responseTime: 0.8,
      },
    ])
  }

  const handleExport = () => {
    const chatLog = messages.map((m) => `[${m.timestamp.toLocaleTimeString()}] ${m.sender}: ${m.content}`).join("\n")
    const blob = new Blob([chatLog], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-test-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Your Bot</h1>
          <p className="text-muted-foreground">Test your AI chatbot's responses and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Chat
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat Test Interface
              </CardTitle>
              <CardDescription>Test your chatbot in real-time</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.sender === "bot" && message.confidence && (
                            <>
                              <span>•</span>
                              <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                            </>
                          )}
                          {message.sender === "bot" && message.responseTime && (
                            <>
                              <span>•</span>
                              <span>{message.responseTime.toFixed(1)}s</span>
                            </>
                          )}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Controls & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Tests</CardTitle>
              <CardDescription>Test common scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={testScenario} onValueChange={setTestScenario} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="edge">Edge Cases</TabsTrigger>
                </TabsList>

                {Object.entries(testScenarios).map(([key, questions]) => (
                  <TabsContent key={key} value={key} className="space-y-2">
                    {questions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-3 bg-transparent"
                        onClick={() => handleQuickTest(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Messages</span>
                <Badge variant="outline">{stats.totalMessages}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Response Time</span>
                <Badge variant="outline">{stats.avgResponseTime.toFixed(1)}s</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Confidence</span>
                <Badge variant="outline">{Math.round(stats.avgConfidence * 100)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <Badge variant="outline">{Math.round(stats.successRate * 100)}%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">High confidence responses: 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Low confidence responses: 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Fast responses (&lt;2s): 7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
