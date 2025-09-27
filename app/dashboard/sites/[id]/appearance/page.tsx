"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Palette, Eye, MessageSquare, Settings } from "lucide-react"
import { useSiteChatBotConfigStore } from "@/store/useSiteChatBotConfigStore"

export default function AppearancePage() {
  const params = useParams()
  const siteId = params.id as string

  const { config, loading, error, fetchConfig, saveConfig } = useSiteChatBotConfigStore()

  const [localConfig, setLocalConfig] = useState(config)

  // fetch config on mount
  useEffect(() => {
    if (siteId) fetchConfig(siteId)
  }, [siteId, fetchConfig])

  // sync store config into local state
  useEffect(() => {
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
    setLocalConfig(config) // reset back to last saved config
  }

  if (loading && !localConfig) {
    return <p>Loading appearance settings...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appearance</h1>
          <p className="text-muted-foreground">
            You can customise the look and feel of your chatbot interface here.
          </p>
        </div>
      </div>

      {localConfig && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="styling">Styling</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Basic Tab */}
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat Interface
                    </CardTitle>
                    <CardDescription>
                      Configure basic chat interface settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="title-toggle">Title</Label>
                        <p className="text-sm text-muted-foreground">
                          To be shown in the chat window
                        </p>
                      </div>
                      <Switch
                        id="title-toggle"
                        checked={localConfig.titleEnabled}
                        onCheckedChange={(v) => handleChange("titleEnabled", v)}
                      />
                    </div>

                    {localConfig.titleEnabled && (
                      <div className="space-y-2">
                        <Input
                          value={localConfig.title}
                          onChange={(e) => handleChange("title", e.target.value)}
                          placeholder="Enter chat title"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="welcome-toggle">Welcome Message</Label>
                        <p className="text-sm text-muted-foreground">
                          The introductory message from the chatbot
                        </p>
                      </div>
                      <Switch
                        id="welcome-toggle"
                        checked={localConfig.welcomeEnabled}
                        onCheckedChange={(v) => handleChange("welcomeEnabled", v)}
                      />
                    </div>

                    {localConfig.welcomeEnabled && (
                      <div className="space-y-2">
                        <Textarea
                          value={localConfig.welcomeMessage}
                          onChange={(e) =>
                            handleChange("welcomeMessage", e.target.value)
                          }
                          placeholder="Enter welcome message"
                          rows={3}
                        />
                      </div>
                    )}

                    {/* Welcome Popup Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="welcome-popup-toggle">Welcome Popup</Label>
                        <p className="text-sm text-muted-foreground">
                          Show the welcome message as a popup above the launcher button.
                        </p>
                      </div>
                      <Switch
                        id="welcome-popup-toggle"
                        checked={localConfig.welcomePopup}
                        onCheckedChange={(v) => handleChange("welcomePopup", v)}
                      />
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>

              {/* Styling Tab */}
              <TabsContent value="styling" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Visual Styling
                    </CardTitle>
                    <CardDescription>
                      Customize colors, position, and appearance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={localConfig.primaryColor}
                          onChange={(e) =>
                            handleChange("primaryColor", e.target.value)
                          }
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={localConfig.primaryColor}
                          onChange={(e) =>
                            handleChange("primaryColor", e.target.value)
                          }
                          placeholder="#2563eb"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={localConfig.theme}
                        onValueChange={(v) => handleChange("theme", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar Style</Label>
                      <Select
                        value={localConfig.avatar}
                        onValueChange={(v) => handleChange("avatar", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="robot">Robot</SelectItem>
                          <SelectItem value="human">Human</SelectItem>
                          <SelectItem value="custom">Custom Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription>
                      Custom CSS and advanced configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <Textarea
                        id="custom-css"
                        value={""} // store doesn’t have customCSS yet
                        onChange={() => { }}
                        placeholder="/* Add your custom CSS here */"
                        rows={8}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Add custom CSS to further customize your chat widget appearance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={loading} className="flex-1">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>


          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>See how your changes will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-12 rounded-lg min-h-[400px] relative">
                  <div
                    className="rounded-lg min-h-[400px] flex flex-col shadow-md overflow-hidden"
                    style={{
                      backgroundColor:
                        localConfig.theme === "dark"
                          ? "#1f2937"
                          : localConfig.theme === "light"
                            ? "#ffffff"
                            : "#f9fafb",
                      color: localConfig.theme === "dark" ? "#f9fafb" : "#111827",
                    }}
                  >
                    {/* Header */}
                    {localConfig.titleEnabled && (
                      <div
                        className="px-4 py-2 font-semibold"
                        style={{ backgroundColor: localConfig.primaryColor, color: "#fff" }}
                      >
                        {localConfig.title}
                      </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
                      {localConfig.welcomeEnabled && (
                        <div className="flex items-start gap-2">
                          {/* Avatar */}
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs overflow-hidden">
                            {localConfig.avatar === "robot" && "🤖"}
                            {localConfig.avatar === "human" && "🙂"}
                            {localConfig.avatar === "default" && "A"}
                            {localConfig.avatar === "custom" && (
                              <img
                                src="/placeholder-avatar.png"
                                alt="avatar"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div
                            className="px-3 py-2 rounded-lg"
                            style={{
                              backgroundColor:
                                localConfig.theme === "dark" ? "#374151" : "#f3f4f6",
                            }}
                          >
                            {localConfig.welcomeMessage}
                          </div>
                        </div>
                      )}

                      {/* Example user message */}
                      <div className="flex justify-end">
                        <div
                          className="px-3 py-2 rounded-lg text-white"
                          style={{ backgroundColor: localConfig.primaryColor }}
                        >
                          What services do you provide?
                        </div>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="border-t p-3 flex gap-2">
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button
                        size="sm"
                        style={{ backgroundColor: localConfig.primaryColor }}
                      >
                        Send
                      </Button>
                    </div>
                  </div>

                  {/* Launcher Button Preview */}
                  <div className="mt-6 flex justify-end">
                    <div className="relative">
                      {localConfig.welcomePopup && (
                        <div className="absolute -top-12 right-0 bg-white dark:bg-gray-800 shadow-md px-3 py-2 rounded-lg text-sm border">
                          {localConfig.welcomeMessage}
                        </div>
                      )}
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        style={{ backgroundColor: localConfig.primaryColor }}
                      >
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Current Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Title:</span>
                    <Badge variant={localConfig.titleEnabled ? "default" : "secondary"}>
                      {localConfig.titleEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Welcome:</span>
                    <Badge variant={localConfig.welcomeEnabled ? "default" : "secondary"}>
                      {localConfig.welcomeEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <Badge variant="outline">{localConfig.theme}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      )}
    </div>
  )
}
