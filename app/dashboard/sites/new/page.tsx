"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Globe, FileText, Upload } from "lucide-react"
import { useSitesStore } from "@/store/useSitesStore"

export default function NewSitePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [domain, setDomain] = useState("")
  const [ingestType, setIngestType] = useState<"website" | "documents">("website")
  const [maxDepth, setMaxDepth] = useState("3")
  const [maxPages, setMaxPages] = useState("100")
  const [excludePatterns, setExcludePatterns] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const { createSite, isLoading, error } = useSitesStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const siteId = await createSite({
      title,
      description,
      domain,
      ingestType,
      maxDepth,
      maxPages,
      excludePatterns,
      files,
    })
    if (siteId) router.push(`/dashboard/sites/${siteId}`)
  }



  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Chatbot Site</h1>
            <p className="text-muted-foreground">
              Set up a new AI chatbot by training it on your website or documents.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide basic details about your chatbot site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Site Title *</Label>
                    <Input
                      id="title"
                      placeholder="Customer Support Bot"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="bg-input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="A helpful assistant for customer inquiries"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-input"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Source */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Source</CardTitle>
                  <CardDescription>Choose how to train your chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={ingestType} onValueChange={(value) => setIngestType(value as "website" | "documents")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="website" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website Crawling
                      </TabsTrigger>
                      <TabsTrigger value="documents" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Document Upload
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="website" className="space-y-4 mt-6">
                      <div className="grid gap-2">
                        <Label htmlFor="domain">Website URL *</Label>
                        <Input
                          id="domain"
                          type="url"
                          placeholder="https://example.com"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                          required={ingestType === "website"}
                          className="bg-input"
                        />
                        <p className="text-xs text-muted-foreground">
                          We'll crawl your website and extract content to train the chatbot
                        </p>
                      </div>

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
                        <Label htmlFor="excludePatterns">Exclude Patterns (optional)</Label>
                        <Textarea
                          id="excludePatterns"
                          placeholder="/admin/*&#10;/private/*&#10;*.pdf"
                          value={excludePatterns}
                          onChange={(e) => setExcludePatterns(e.target.value)}
                          className="bg-input"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                          One pattern per line. Use * for wildcards (e.g., /admin/*, *.pdf)
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4 mt-6">
                      <div className="grid gap-2">
                        <Label htmlFor="files">Upload Documents</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Drop files here or click to browse</p>
                            <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT, and Markdown files</p>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.docx,.txt,.md"
                            onChange={(e) => setFiles(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {files && files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Selected files:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {Array.from(files).map((file, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {error && (
                <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Link href="/dashboard">
                  <Button variant="outline" type="button" className="bg-transparent">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Chatbot Site"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
