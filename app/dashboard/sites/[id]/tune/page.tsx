"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Brain, Zap, Shield } from "lucide-react"

export default function TuneAIPage() {
  const params = useParams()
  const siteId = params.id as string

  // AI Configuration State
  const [botName, setBotName] = useState("Neural Assistant")
  const [botPersonality, setBotPersonality] = useState("professional")
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant for Neural.ai. Be professional, friendly, and concise in your responses. Always try to help users with their questions about our platform and services.",
  )
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([150])
  const [responseLength, setResponseLength] = useState("medium")
  const [language, setLanguage] = useState("en")
  const [fallbackEnabled, setFallbackEnabled] = useState(true)
  const [fallbackMessage, setFallbackMessage] = useState(
    "I'm sorry, I don't have enough information to answer that question. Would you like to speak with a human agent?",
  )
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.6])
  const [contextWindow, setContextWindow] = useState([5])

  // Advanced Settings
  const [enableMemory, setEnableMemory] = useState(true)
  const [enableSentiment, setEnableSentiment] = useState(false)
  const [enableModeration, setEnableModeration] = useState(true)
  const [enableAnalytics, setEnableAnalytics] = useState(true)

  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSuccess("AI configuration saved successfully!")
    setIsSaving(false)
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleReset = () => {
    setBotName("Neural Assistant")
    setBotPersonality("professional")
    setSystemPrompt(
      "You are a helpful AI assistant for Neural.ai. Be professional, friendly, and concise in your responses. Always try to help users with their questions about our platform and services.",
    )
    setTemperature([0.7])
    setMaxTokens([150])
    setResponseLength("medium")
    setLanguage("en")
    setFallbackEnabled(true)
    setFallbackMessage(
      "I'm sorry, I don't have enough information to answer that question. Would you like to speak with a human agent?",
    )
    setConfidenceThreshold([0.6])
    setContextWindow([5])
    setEnableMemory(true)
    setEnableSentiment(false)
    setEnableModeration(true)
    setEnableAnalytics(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tune AI</h1>
          <p className="text-muted-foreground">Configure your AI chatbot's behavior and personality</p>
        </div>
      </div>

      <Tabs defaultValue="personality" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="personality" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Bot Identity
                  </CardTitle>
                  <CardDescription>Define your chatbot's name and personality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input
                      id="bot-name"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Enter bot name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personality">Personality Type</Label>
                    <Select value={botPersonality} onValueChange={setBotPersonality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="empathetic">Empathetic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Primary Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Prompt</CardTitle>
                  <CardDescription>Define how your AI should behave and respond</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Enter system prompt..."
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Characters: {systemPrompt.length} / 2000</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your bot will appear to users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="bg-background border rounded-lg shadow-sm max-w-sm">
                      <div className="border-b p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs text-primary-foreground font-medium">
                              {botName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{botName}</p>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-muted-foreground">Online</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex gap-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary-foreground">{botName.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="bg-muted p-2 rounded-lg text-sm max-w-[80%]">
                            Hello! I'm {botName}. How can I help you today?
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personality Traits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Personality:</span>
                      <Badge variant="outline">{botPersonality}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Language:</span>
                      <Badge variant="outline">{language.toUpperCase()}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Temperature:</span>
                      <Badge variant="outline">{temperature[0]}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Response Settings
                </CardTitle>
                <CardDescription>Configure how your AI generates responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Creativity (Temperature)</Label>
                    <span className="text-sm text-muted-foreground">{temperature[0]}</span>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={temperature}
                    onValueChange={setTemperature}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower values make responses more focused, higher values more creative
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-tokens">Max Response Length</Label>
                    <span className="text-sm text-muted-foreground">{maxTokens[0]} tokens</span>
                  </div>
                  <Slider
                    id="max-tokens"
                    min={50}
                    max={500}
                    step={10}
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response-length">Response Style</Label>
                  <Select value={responseLength} onValueChange={setResponseLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short & Concise</SelectItem>
                      <SelectItem value="medium">Medium Detail</SelectItem>
                      <SelectItem value="long">Detailed & Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="context-window">Context Memory</Label>
                    <span className="text-sm text-muted-foreground">{contextWindow[0]} messages</span>
                  </div>
                  <Slider
                    id="context-window"
                    min={1}
                    max={20}
                    step={1}
                    value={contextWindow}
                    onValueChange={setContextWindow}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    How many previous messages the AI remembers in conversation
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fallback Handling</CardTitle>
                <CardDescription>What happens when the AI can't answer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="fallback-toggle">Enable Fallback</Label>
                    <p className="text-sm text-muted-foreground">Show fallback message for low confidence responses</p>
                  </div>
                  <Switch id="fallback-toggle" checked={fallbackEnabled} onCheckedChange={setFallbackEnabled} />
                </div>

                {fallbackEnabled && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                        <span className="text-sm text-muted-foreground">{confidenceThreshold[0]}</span>
                      </div>
                      <Slider
                        id="confidence-threshold"
                        min={0.1}
                        max={1}
                        step={0.1}
                        value={confidenceThreshold}
                        onValueChange={setConfidenceThreshold}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum confidence required before showing fallback message
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fallback-message">Fallback Message</Label>
                      <Textarea
                        id="fallback-message"
                        value={fallbackMessage}
                        onChange={(e) => setFallbackMessage(e.target.value)}
                        placeholder="Enter fallback message..."
                        rows={4}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Features
                </CardTitle>
                <CardDescription>Enable advanced AI capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="memory-toggle">Conversation Memory</Label>
                    <p className="text-sm text-muted-foreground">Remember user context across sessions</p>
                  </div>
                  <Switch id="memory-toggle" checked={enableMemory} onCheckedChange={setEnableMemory} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sentiment-toggle">Sentiment Analysis</Label>
                    <p className="text-sm text-muted-foreground">Detect user emotions and adjust responses</p>
                  </div>
                  <Switch id="sentiment-toggle" checked={enableSentiment} onCheckedChange={setEnableSentiment} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="analytics-toggle">Advanced Analytics</Label>
                    <p className="text-sm text-muted-foreground">Track detailed conversation metrics</p>
                  </div>
                  <Switch id="analytics-toggle" checked={enableAnalytics} onCheckedChange={setEnableAnalytics} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Current AI performance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <Badge variant="outline">1.2s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence Score</span>
                    <Badge variant="outline">87%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <Badge variant="outline">94%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Data Size</span>
                    <Badge variant="outline">2.3MB</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Content Moderation
              </CardTitle>
              <CardDescription>Configure safety and moderation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="moderation-toggle">Enable Content Moderation</Label>
                  <p className="text-sm text-muted-foreground">Filter inappropriate content and responses</p>
                </div>
                <Switch id="moderation-toggle" checked={enableModeration} onCheckedChange={setEnableModeration} />
              </div>

              {enableModeration && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block Profanity</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block Spam</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block Personal Info</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block Harmful Content</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">Blocked Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {["spam", "inappropriate", "offensive"].map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    Add Keyword
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={handleSave} disabled={isSaving} className="flex-1">
          {isSaving ? "Saving Configuration..." : "Save Configuration"}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
      </div>

      {success && (
        <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}
    </div>
  )
}
