"use client"

import { useEffect, useState } from "react"
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
import { useSiteChatBotTuningStore } from "@/store/useSiteChatBotTuningStore "

export default function TuneAIPage() {
  const params = useParams()
  const siteId = params.id as string

  const { config, loading, error, fetchConfig, saveConfig } = useSiteChatBotTuningStore()
  const [localConfig, setLocalConfig] = useState(config)

  useEffect(() => {
    if (siteId) fetchConfig(siteId)
  }, [siteId, fetchConfig])

  useEffect(() => {
    console.log(config)
    if (config) setLocalConfig(config)
  }, [config])

  const handleChange = (key: keyof typeof localConfig, value: any) => {
    setLocalConfig((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    if (!localConfig) return
    await saveConfig(siteId, localConfig)
  }

  const handleReset = () => {
    if (!config) return
    setLocalConfig(config)
  }

  if (loading && !localConfig) return <p>Loading tuning settings...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tune AI</h1>
          <p className="text-muted-foreground">Configure your AI chatbot's behavior and personality</p>
        </div>
      </div>

      {localConfig && (
        <Tabs defaultValue="personality" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>

          {/* — Personality Tab — */}
          <TabsContent value="personality" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" /> Bot Identity
                  </CardTitle>
                  <CardDescription>Define your chatbot's name and personality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input
                      id="bot-name"
                      value={localConfig.botName}
                      onChange={(e) => handleChange("botName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personality">Personality Type</Label>
                    <Select
                      value={localConfig.botPersonality}
                      onValueChange={(v) => handleChange("botPersonality", v)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
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
                    <Select
                      value={localConfig.language}
                      onValueChange={(v) => handleChange("language", v)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
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
                    value={localConfig.systemPrompt}
                    onChange={(e) => handleChange("systemPrompt", e.target.value)}
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Characters: {localConfig.systemPrompt.length} / 2000
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* — Behavior Tab — */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" /> Response Settings
                  </CardTitle>
                  <CardDescription>Configure how your AI generates responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="temperature">Creativity (Temperature)</Label>
                    <Slider
                      id="temperature"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[localConfig.temperature]}
                      onValueChange={(v) => handleChange("temperature", v[0])}
                    />
                    <p className="text-xs text-muted-foreground">Lower values = focused, higher = creative</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="max-tokens">Max Response Length</Label>
                    <Slider
                      id="max-tokens"
                      min={50}
                      max={500}
                      step={10}
                      value={[localConfig.maxTokens]}
                      onValueChange={(v) => handleChange("maxTokens", v[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response-length">Response Style</Label>
                    <Select
                      value={localConfig.responseLength}
                      onValueChange={(v) => handleChange("responseLength", v)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short & Concise</SelectItem>
                        <SelectItem value="medium">Medium Detail</SelectItem>
                        <SelectItem value="long">Detailed & Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="context-window">Context Memory</Label>
                    <Slider
                      id="context-window"
                      min={1}
                      max={20}
                      step={1}
                      value={[localConfig.contextWindow]}
                      onValueChange={(v) => handleChange("contextWindow", v[0])}
                    />
                    <p className="text-xs text-muted-foreground">Number of past messages remembered</p>
                  </div>
                </CardContent>
              </Card>

              {/* Fallback Handling */}
              <Card>
                <CardHeader>
                  <CardTitle>Fallback Handling</CardTitle>
                  <CardDescription>What happens when the AI can't answer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fallback-toggle">Enable Fallback</Label>
                    <Switch
                      id="fallback-toggle"
                      checked={localConfig.fallbackEnabled}
                      onCheckedChange={(v) => handleChange("fallbackEnabled", v)}
                    />
                  </div>

                  {localConfig.fallbackEnabled && (
                    <>
                      <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                      <Slider
                        id="confidence-threshold"
                        min={0.1}
                        max={1}
                        step={0.1}
                        value={[localConfig.confidenceThreshold]}
                        onValueChange={(v) => handleChange("confidenceThreshold", v[0])}
                      />
                      <Label htmlFor="fallback-message">Fallback Message</Label>
                      <Textarea
                        value={localConfig.fallbackMessage}
                        onChange={(e) => handleChange("fallbackMessage", e.target.value)}
                        rows={4}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* — Advanced Tab — */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" /> Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <Label>Conversation Memory</Label>
                    <Switch
                      checked={localConfig.enableMemory}
                      onCheckedChange={(v) => handleChange("enableMemory", v)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Sentiment Analysis</Label>
                    <Switch
                      checked={localConfig.enableSentiment}
                      onCheckedChange={(v) => handleChange("enableSentiment", v)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Content Moderation</Label>
                    <Switch
                      checked={localConfig.enableModeration}
                      onCheckedChange={(v) => handleChange("enableModeration", v)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Advanced Analytics</Label>
                    <Switch
                      checked={localConfig.enableAnalytics}
                      onCheckedChange={(v) => handleChange("enableAnalytics", v)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* — Safety Tab — */}
          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Content Moderation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <Label>Enable Content Moderation</Label>
                    <Switch
                      checked={localConfig.enableModeration}
                      onCheckedChange={(v) => handleChange("enableModeration", v)}
                    />
                  </div>
                  {localConfig.enableModeration && (
                    <div className="space-y-2 pl-4 border-l-2 border-muted">
                      {["spam", "inappropriate", "offensive"].map((kw) => (
                        <Badge key={kw} variant="secondary">{kw}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <div className="flex gap-4">
        <Button onClick={handleSave} disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
