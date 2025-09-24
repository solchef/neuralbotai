"use client"

import { useState } from "react"
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

export default function AppearancePage() {
  const params = useParams()
  const siteId = params.id as string

  // Appearance settings state
  const [title, setTitle] = useState("Neural.ai Assistant")
  const [titleEnabled, setTitleEnabled] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState("Hi, How can I help you today?")
  const [welcomeEnabled, setWelcomeEnabled] = useState(true)
  const [welcomePopup, setWelcomePopup] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#10b981")
  const [position, setPosition] = useState("bottom-right")
  const [theme, setTheme] = useState("light")
  const [avatar, setAvatar] = useState("default")
  const [customCSS, setCustomCSS] = useState("")

  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSuccess("Changes saved successfully!")
    setIsSaving(false)
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleReset = () => {
    setTitle("Neural.ai Assistant")
    setTitleEnabled(true)
    setWelcomeMessage("Hi, How can I help you today?")
    setWelcomeEnabled(true)
    setWelcomePopup(false)
    setPrimaryColor("#10b981")
    setPosition("bottom-right")
    setTheme("light")
    setAvatar("default")
    setCustomCSS("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appearance</h1>
          <p className="text-muted-foreground">You can customise the look and feel of your chatbot interface here.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat Interface
                  </CardTitle>
                  <CardDescription>Configure basic chat interface settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="title-toggle">Title</Label>
                      <p className="text-sm text-muted-foreground">To be shown in the chat window</p>
                    </div>
                    <Switch id="title-toggle" checked={titleEnabled} onCheckedChange={setTitleEnabled} />
                  </div>

                  {titleEnabled && (
                    <div className="space-y-2">
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter chat title" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="welcome-toggle">Welcome Message</Label>
                      <p className="text-sm text-muted-foreground">The introductory message from the chatbot</p>
                    </div>
                    <Switch id="welcome-toggle" checked={welcomeEnabled} onCheckedChange={setWelcomeEnabled} />
                  </div>

                  {welcomeEnabled && (
                    <div className="space-y-2">
                      <Textarea
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        placeholder="Enter welcome message"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="popup-toggle">Welcome Message Popup</Label>
                      <p className="text-sm text-muted-foreground">
                        Show introductory message above chat launch circle
                      </p>
                    </div>
                    <Switch id="popup-toggle" checked={welcomePopup} onCheckedChange={setWelcomePopup} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Visual Styling
                  </CardTitle>
                  <CardDescription>Customize colors, position, and appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#10b981"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Widget Position</Label>
                    <Select value={position} onValueChange={setPosition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
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
                    <Select value={avatar} onValueChange={setAvatar}>
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

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>Custom CSS and advanced configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Textarea
                      id="custom-css"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="/* Add your custom CSS here */
.chat-widget {
  border-radius: 12px;
}

.chat-message {
  font-size: 14px;
}"
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
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Appearance
            </Button>
          </div>

          {success && (
            <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}
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
              <div className="bg-muted/50 p-8 rounded-lg min-h-[400px] relative">
                {/* Chat Widget Preview */}
                <div
                  className={`absolute ${
                    position === "bottom-right"
                      ? "bottom-4 right-4"
                      : position === "bottom-left"
                        ? "bottom-4 left-4"
                        : position === "top-right"
                          ? "top-4 right-4"
                          : "top-4 left-4"
                  }`}
                >
                  {/* Welcome Popup */}
                  {welcomePopup && welcomeEnabled && (
                    <div className="mb-2 bg-background border rounded-lg p-3 shadow-lg max-w-xs">
                      <p className="text-sm">{welcomeMessage}</p>
                    </div>
                  )}

                  {/* Chat Button */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Expanded Chat Preview */}
                <div className="bg-background border rounded-lg shadow-lg max-w-sm mx-auto mt-8">
                  {titleEnabled && (
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <span className="text-xs text-white font-medium">AI</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{title}</p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 space-y-3 min-h-[200px]">
                    {welcomeEnabled && (
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <span className="text-xs text-white">AI</span>
                        </div>
                        <div className="bg-muted p-2 rounded-lg text-sm max-w-[80%]">{welcomeMessage}</div>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg text-sm max-w-[80%]">
                        What services do you provide?
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-3">
                    <div className="flex gap-2">
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button size="sm" style={{ backgroundColor: primaryColor }}>
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Title:</span>
                  <Badge variant={titleEnabled ? "default" : "secondary"}>
                    {titleEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Welcome Message:</span>
                  <Badge variant={welcomeEnabled ? "default" : "secondary"}>
                    {welcomeEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Position:</span>
                  <Badge variant="outline">{position}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Theme:</span>
                  <Badge variant="outline">{theme}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
