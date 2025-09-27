"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
      content: "👨‍💻 Hi there! I’m Sentseven assistant. How can I help you today?",
      timestamp: new Date(),
      confidence: 1.0,
      responseTime: 0.5,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [testScenario, setTestScenario] = useState("general")
  const [streamingBotMessage, setStreamingBotMessage] = useState("")

  // Ref to the scrollable container (a plain div with overflow-y)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Test scenarios
  const testScenarios = {
    general: ["What services do you offer?", "How can I contact support?", "What are your business hours?"],
    billing: ["What are your pricing plans?", "How do I upgrade my account?", "Can I get a refund?"],
  }

  const stats = {
    totalMessages: messages.length,
    avgResponseTime:
      messages.filter((m) => m.sender === "bot" && m.responseTime).reduce((acc, m) => acc + (m.responseTime || 0), 0) /
      (messages.filter((m) => m.sender === "bot" && m.responseTime).length || 1),
    avgConfidence:
      messages.filter((m) => m.sender === "bot" && m.confidence).reduce((acc, m) => acc + (m.confidence || 0), 0) /
      (messages.filter((m) => m.sender === "bot" && m.confidence).length || 1),
    successRate: 0.94,
  }

  // Auto-scroll: whenever messages or streamingBotMessage changes, scroll to bottom
  useEffect(() => {
    const el = scrollAreaRef.current
    if (!el) return
    // use requestAnimationFrame so layout updates first
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages, streamingBotMessage])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    // Build convo to send (avoid stale messages)
    const convo = [...messages, userMessage]

    // Append user's message locally
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    setStreamingBotMessage("")

    const startTime = performance.now()

    try {
      const res = await fetch(`/api/sites/${siteId}/chat/retrieval`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: convo.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.content,
          })),
          siteId,
        }),
      })

      if (!res.body) throw new Error("No response from server")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let botText = ""

      // Stream chunks, update streamingBotMessage so the UI shows incremental text
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        botText += chunk
        setStreamingBotMessage(botText)
      }

      const endTime = performance.now()
      const responseTime = (endTime - startTime) / 1000

      const botMessage: Message = {
        id: Date.now().toString(),
        sender: "bot",
        content: botText.trim() || "❌ Error: Empty response",
        timestamp: new Date(),
        confidence: typeof (botText) === "string" ? Math.random() * 0.2 + 0.8 : 0.8, // placeholder if API doesn't include confidence
        responseTime,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Bot API error:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "bot",
        content: "❌ Error: Could not get response",
        timestamp: new Date(),
        confidence: 0.0,
        responseTime: 0,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setStreamingBotMessage("")
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
        content: "👨‍💻 Hi there! I’m Sentseven assistant. How can I help you today?",
        timestamp: new Date(),
        confidence: 1.0,
        responseTime: 0.5,
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

            {/* make the content a column that fills the card and hides overflow */}
            <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
              {/* scrollable container: flex-1 and overflow-y-auto so input stays pinned */}
              <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.sender === "bot" && message.confidence !== undefined && (
                            <>
                              <span>•</span>
                              <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                            </>
                          )}
                          {message.sender === "bot" && message.responseTime !== undefined && (
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

                  {/* Streaming message (live text while reading) */}
                  {isTyping && streamingBotMessage && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap">{streamingBotMessage}</div>
                    </div>
                  )}

                  {/* Typing dots fallback */}
                  {isTyping && !streamingBotMessage && (
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
              </div>

              {/* Input pinned at bottom */}
              <div className="border-t p-4 bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
                  <TabsTrigger value="billing">Billing</TabsTrigger>
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
