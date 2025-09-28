"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, ExternalLink, Code, Globe, Smartphone, Monitor, Eye, Settings, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import React from "react"

export default function DeployPage({ params }: { params: Promise<{ id: string }> }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [deploymentSettings, setDeploymentSettings] = useState({
    position: "bottom-right",
    theme: "light",
    showBranding: true,
    autoOpen: false,
    welcomeMessage: true,
    customDomain: "",
    allowedDomains: "",
    mobileOptimized: true,
  })

  const { id: siteId } = React.use(params)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neural-ai.vercel.app"

  const directLink = `${baseUrl}/widget?site-id=${siteId}&token=4545e07970a9`
  const scriptCode = `
  <script src="http://localhost:3000/chat-bot-widget.js" 
          data-site-id="fa509656-dfd6-4b35-a0c9-4545e07970a9"
          data-token="a0c9-4545e07970a9" defer>
  </script>
  `

  const iframeCode = `
  <iframe
    src="${baseUrl}/widget?site-id=${siteId}&token=4545e07970a9"
    width="400"
    height="600"
    frameborder="0"
    style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
    title="Neural AI Chatbot">
  </iframe>
  `

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast({
      title: "Copied to clipboard",
      description: `${type} code has been copied to your clipboard.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSettingChange = (key: string, value: any) => {
    setDeploymentSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deploy Your Chatbot</h1>
        <p className="text-muted-foreground mt-2">
          Choose how you want to deploy your Neural AI chatbot to your website or share it directly.
        </p>
      </div>

      {/* Deployment Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Deployment Status
              </CardTitle>
              <CardDescription>Your chatbot is ready for deployment</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="font-semibold">Direct Link</div>
              <div className="text-sm text-muted-foreground">Standalone chat page</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="font-semibold">Widget Script</div>
              <div className="text-sm text-muted-foreground">Embed on any website</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Monitor className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="font-semibold">iFrame</div>
              <div className="text-sm text-muted-foreground">Embed as iframe</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deployment Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Deployment Settings
            </CardTitle>
            <CardDescription>Customize how your chatbot appears</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position">Widget Position</Label>
              <Select
                value={deploymentSettings.position}
                onValueChange={(value) => handleSettingChange("position", value)}
              >
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
              <Select value={deploymentSettings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-open">Auto Open Chat</Label>
              <Switch
                id="auto-open"
                checked={deploymentSettings.autoOpen}
                onCheckedChange={(checked) => handleSettingChange("autoOpen", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="welcome-message">Show Welcome Message</Label>
              <Switch
                id="welcome-message"
                checked={deploymentSettings.welcomeMessage}
                onCheckedChange={(checked) => handleSettingChange("welcomeMessage", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="mobile-optimized">Mobile Optimized</Label>
              <Switch
                id="mobile-optimized"
                checked={deploymentSettings.mobileOptimized}
                onCheckedChange={(checked) => handleSettingChange("mobileOptimized", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-branding">Show Neural AI Branding</Label>
              <Switch
                id="show-branding"
                checked={deploymentSettings.showBranding}
                onCheckedChange={(checked) => handleSettingChange("showBranding", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowed-domains">Allowed Domains</Label>
              <Textarea
                id="allowed-domains"
                placeholder="example.com&#10;subdomain.example.com&#10;Leave empty to allow all domains"
                value={deploymentSettings.allowedDomains}
                onChange={(e) => handleSettingChange("allowedDomains", e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">One domain per line. Leave empty to allow all domains.</p>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Methods */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Deployment Methods</CardTitle>
            <CardDescription>Choose how you want to deploy your chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="direct-link" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="direct-link" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Direct Link
                </TabsTrigger>
                <TabsTrigger value="script" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Script
                </TabsTrigger>
                <TabsTrigger value="iframe" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  iFrame
                </TabsTrigger>
              </TabsList>

              <TabsContent value="direct-link" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Direct Link</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share this link directly with your users or use it as a standalone chat page.
                  </p>
                  <div className="flex gap-2">
                    <Input value={directLink} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(directLink, "Direct link")}>
                      {copied === "Direct link" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(directLink, "_blank")}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Best for:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Customer support portals</li>
                    <li>• Dedicated chat pages</li>
                    <li>• Social media sharing</li>
                    <li>• Email campaigns</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="script" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Widget Script</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add this script to your website's HTML to embed the chat widget. It will appear as a floating
                    button.
                  </p>
                  <div className="relative">
                    <Textarea value={scriptCode} readOnly className="font-mono text-xs resize-none" rows={12} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(scriptCode, "Script")}
                    >
                      {copied === "Script" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Installation:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Copy the script code above</li>
                    <li>2. Paste it before the closing &lt;/body&gt; tag</li>
                    <li>3. The widget will automatically appear on your site</li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="iframe" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">iFrame Embed</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Embed the chatbot as an iframe in your website. Perfect for dedicated sections or pages.
                  </p>
                  <div className="relative">
                    <Textarea value={iframeCode} readOnly className="font-mono text-xs resize-none" rows={8} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(iframeCode, "iFrame")}
                    >
                      {copied === "iFrame" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Customization:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Adjust width and height as needed</li>
                    <li>• Modify border-radius for styling</li>
                    <li>• Add custom CSS for positioning</li>
                    <li>• Responsive design supported</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <CardDescription>See how your chatbot will appear to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-muted/50 p-4 rounded-lg mb-2 relative h-32 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-muted-foreground" />
                <div className="absolute bottom-2 right-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="font-medium">Desktop</div>
              <div className="text-sm text-muted-foreground">Widget in {deploymentSettings.position}</div>
            </div>

            <div className="text-center">
              <div className="bg-muted/50 p-4 rounded-lg mb-2 relative h-32 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-muted-foreground" />
                <div className="absolute bottom-2 right-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="font-medium">Mobile</div>
              <div className="text-sm text-muted-foreground">Optimized for mobile</div>
            </div>

            <div className="text-center">
              <div className="bg-muted/50 p-4 rounded-lg mb-2 relative h-32 flex items-center justify-center border-2 border-dashed">
                <Code className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="font-medium">iFrame</div>
              <div className="text-sm text-muted-foreground">Embedded view</div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
