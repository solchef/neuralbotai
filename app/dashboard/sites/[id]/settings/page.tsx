"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Palette, Settings, Trash2 } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function SiteSettingsPage({ params }: PageProps) {
  const [siteId, setSiteId] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [domain, setDomain] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [ingestFrequency, setIngestFrequency] = useState("manual")
  const [maxDepth, setMaxDepth] = useState("3")
  const [maxPages, setMaxPages] = useState("100")
  const [excludePatterns, setExcludePatterns] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadSite = async () => {
      const resolvedParams = await params
      setSiteId(resolvedParams.id)

      setIsLoading(true)
      const supabase = createClient()

      try {
        const { data: site, error } = await supabase.from("sites").select("*").eq("id", resolvedParams.id).single()

        if (error) throw error

        setTitle(site.title || "")
        setDescription(site.description || "")
        setDomain(site.domain || "")
        setWelcomeMessage(site.theme?.welcome_message || "How can I help you today?")
        setPrimaryColor(site.theme?.primary_color || "#000000")
        setIngestFrequency(site.ingest_frequency || "manual")
        setMaxDepth(site.crawl_settings?.max_depth?.toString() || "3")
        setMaxPages(site.crawl_settings?.max_pages?.toString() || "100")
        setExcludePatterns(site.crawl_settings?.exclude_patterns?.join("\n") || "")
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Failed to load site")
      } finally {
        setIsLoading(false)
      }
    }

    loadSite()
  }, [params])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("sites")
        .update({
          title,
          description,
          domain: domain || null,
          ingest_frequency: ingestFrequency,
          theme: {
            welcome_message: welcomeMessage,
            primary_color: primaryColor,
          },
          crawl_settings: {
            max_depth: Number.parseInt(maxDepth),
            max_pages: Number.parseInt(maxPages),
            exclude_patterns: excludePatterns.split("\n").filter((p) => p.trim()),
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", siteId)

      if (error) throw error

      setSuccess("Settings saved successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this site? This action cannot be undone.")) {
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("sites").delete().eq("id", siteId)

      if (error) throw error

      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to delete site")
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading site settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link
              href={`/dashboard/sites/${siteId}`}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
            <p className="text-muted-foreground">Configure your chatbot site settings and appearance.</p>
          </div>

          <form onSubmit={handleSave}>
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList>
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="crawling" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Crawling
                </TabsTrigger>
                <TabsTrigger value="danger" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Danger Zone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your site's basic information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Site Title</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-input" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="domain">Website URL</Label>
                      <Input
                        id="domain"
                        type="url"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Auto-sync Frequency</Label>
                      <Select value={ingestFrequency} onValueChange={setIngestFrequency}>
                        <SelectTrigger className="bg-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual only</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Widget Appearance</CardTitle>
                    <CardDescription>Customize how your chatbot widget looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="welcomeMessage">Welcome Message</Label>
                      <Input
                        id="welcomeMessage"
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        className="bg-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-16 h-10 p-1 bg-input"
                        />
                        <Input
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="bg-input"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>See how your widget will look</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-8 rounded-lg">
                      <div className="bg-background border rounded-lg p-4 max-w-sm ml-auto">
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <span className="text-xs text-white font-medium">AI</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{title}</p>
                            <p className="text-xs text-muted-foreground">Online</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-card p-2 rounded text-sm">{welcomeMessage}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crawling" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crawling Settings</CardTitle>
                    <CardDescription>Configure how your website is crawled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="maxDepth">Max Crawl Depth</Label>
                        <Select value={maxDepth} onValueChange={setMaxDepth}>
                          <SelectTrigger className="bg-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 level</SelectItem>
                            <SelectItem value="2">2 levels</SelectItem>
                            <SelectItem value="3">3 levels</SelectItem>
                            <SelectItem value="4">4 levels</SelectItem>
                            <SelectItem value="5">5 levels</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="maxPages">Max Pages</Label>
                        <Select value={maxPages} onValueChange={setMaxPages}>
                          <SelectTrigger className="bg-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50 pages</SelectItem>
                            <SelectItem value="100">100 pages</SelectItem>
                            <SelectItem value="250">250 pages</SelectItem>
                            <SelectItem value="500">500 pages</SelectItem>
                            <SelectItem value="1000">1000 pages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="excludePatterns">Exclude Patterns</Label>
                      <Textarea
                        id="excludePatterns"
                        placeholder="/admin/*&#10;/private/*&#10;*.pdf"
                        value={excludePatterns}
                        onChange={(e) => setExcludePatterns(e.target.value)}
                        className="bg-input"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        One pattern per line. Use * for wildcards (e.g., /admin/*, *.pdf)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="danger" className="space-y-6">
                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Delete Site</CardTitle>
                    <CardDescription>
                      Permanently delete this site and all associated data. This action cannot be undone.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                      {isLoading ? "Deleting..." : "Delete Site"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Link href={`/dashboard/sites/${siteId}`}>
                <Button variant="outline" type="button" className="bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
