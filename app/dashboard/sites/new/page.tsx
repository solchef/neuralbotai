"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Globe,
  FileText,
  Upload,
  Link as LinkIcon,
  FilePlus2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSitesStore } from "@/store/useSitesStore"

export default function NewSitePage() {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState("")
  const [maxDepth, setMaxDepth] = useState("3")
  const [maxPages, setMaxPages] = useState("100")
  const [excludePatterns, setExcludePatterns] = useState("")
  const [description, setDescription] = useState("")
  const [ingestType, setIngestType] = useState<"links" | "documents">("links")
  const [linkType, setLinkType] = useState<
    "fullWebsite" | "webpage" | "pdf" | "word" | "excel" | "youtube" | "freshdesk" | "sitemap"
  >("fullWebsite")
  const [linkValue, setLinkValue] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)

  const router = useRouter()
  const { createSite, isLoading, error } = useSitesStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const siteId = await createSite({
      title,
      description,
      ingestType,
      linkType,
      linkValue,
      maxDepth,
      maxPages,
      excludePatterns,
      files,
    })
    if (siteId) router.push(`/dashboard/sites/${siteId}`)
  }

  const steps = ["Basic Info", "Content Source", "Review"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Chatbot</h1>
            <p className="text-muted-foreground">
              Set up a new AI chatbot by training it on your website, documents, or other content sources.
              You will still be able to add more content like QA , plain texts and more links on the Bot dashboard.
            </p>
          </div>

          {/* Stepper */}
          {/* <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border 
                    ${i === step ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}`}
                >
                  {i + 1}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${i === step ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-border mx-4" />
                )}
              </div>
            ))}
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Info */}
            {step === 0 && (
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
            )}

            {/* Step 2: Content Source */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Content Source</CardTitle>
                  <CardDescription>Choose how to train your chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={ingestType} onValueChange={(v) => setIngestType(v as typeof ingestType)} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full gap-2 bg-transparent">
                      <TabsTrigger
                        value="links"
                        className="w-full rounded-xl  text-base font-medium border border-border hover:bg-muted 
                          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                      >
                        <LinkIcon className="mr-2 h-4 w-4" /> Links Training
                      </TabsTrigger>
                      <TabsTrigger
                        value="documents"
                        className="w-full rounded-xl  text-base font-medium border border-border hover:bg-muted 
                          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                      >
                        <FilePlus2 className="mr-2 h-4 w-4" /> Document Upload
                      </TabsTrigger>
                    </TabsList>
                    {/* Links Training */}
                    <TabsContent value="links" className="mt-6">
                      <Tabs
                        value={linkType}
                        onValueChange={(v) => setLinkType(v as typeof linkType)}
                        className="w-full"
                      >
                        <TabsList className="flex flex-wrap gap-2 mb-4">
                          <TabsTrigger value="fullWebsite">Full Website</TabsTrigger>
                          <TabsTrigger value="webpage">Webpage</TabsTrigger>
                          <TabsTrigger value="pdf">PDF</TabsTrigger>
                          <TabsTrigger value="word">Word Doc</TabsTrigger>
                          <TabsTrigger value="excel">Excel/CSV</TabsTrigger>
                          <TabsTrigger value="youtube">YouTube</TabsTrigger>
                          <TabsTrigger value="freshdesk">FreshDesk</TabsTrigger>
                          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
                        </TabsList>

                        {/* Full Website */}
                        <TabsContent value="fullWebsite" className="space-y-4">
                          <Label>Starting URL *</Label>
                          <Input
                            placeholder="https://example.com"
                            value={linkType === "fullWebsite" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to a webpage and we will visit all the pages starting from it and list them for you to choose from.
                          </p>

                          <div className="grid gap-4">
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
                          </div>

                        </TabsContent>

                        {/* Webpage */}
                        <TabsContent value="webpage" className="space-y-4">
                          <Label>Page URL *</Label>
                          <Input
                            placeholder="https://example.com/page"
                            value={linkType === "webpage" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the target link to import the content from.
                          </p>
                        </TabsContent>

                        {/* PDF */}
                        <TabsContent value="pdf" className="space-y-4">
                          <Label>PDF URL *</Label>
                          <Input
                            placeholder="https://example.com/file.pdf"
                            value={linkType === "pdf" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the url to your PDF file and we will import the text from it.
                          </p>
                        </TabsContent>

                        {/* Word Doc */}
                        <TabsContent value="word" className="space-y-4">
                          <Label>Word Document URL *</Label>
                          <Input
                            placeholder="https://example.com/file.docx"
                            value={linkType === "word" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to the Word document and we will extract the content from it.
                          </p>
                        </TabsContent>

                        {/* Excel/CSV */}
                        <TabsContent value="excel" className="space-y-4">
                          <Label>Excel/CSV File URL *</Label>
                          <Input
                            placeholder="https://example.com/file.csv"
                            value={linkType === "excel" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to the Excel/CSV document and we will extract the content from it.
                          </p>
                        </TabsContent>

                        {/* YouTube */}
                        <TabsContent value="youtube" className="space-y-4">
                          <Label>YouTube Video URL *</Label>
                          <Input
                            placeholder="https://youtube.com/watch?v=xxxxxx"
                            value={linkType === "youtube" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to the YouTube video and we will get the transcript for you.
                          </p>
                        </TabsContent>

                        {/* FreshDesk */}
                        <TabsContent value="freshdesk" className="space-y-4">
                          <Label>FreshDesk Portal URL *</Label>
                          <Input
                            placeholder="https://yourcompany.freshdesk.com"
                            value={linkType === "freshdesk" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to the Freshdesk portal and we will list all articles for you to choose from.
                          </p>
                        </TabsContent>

                        {/* Sitemap */}
                        <TabsContent value="sitemap" className="space-y-4">
                          <Label>Sitemap URL *</Label>
                          <Input
                            placeholder="https://example.com/sitemap.xml"
                            value={linkType === "sitemap" ? linkValue : ""}
                            onChange={(e) => setLinkValue(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the link to the sitemap.xml file and we will visit all the pages from it and list them for you to choose from.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </TabsContent>


                    {/* Documents Upload */}
                    <TabsContent value="documents" className="mt-6 space-y-4">
                      <Label htmlFor="files">Upload Documents</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Drop files here or click to browse</p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF, DOCX, TXT, and Markdown files
                          </p>
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
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {Array.from(files).map((file, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </li>
                          ))}
                        </ul>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>Check your setup before creating the chatbot site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p><strong>Title:</strong> {title}</p>
                  <p><strong>Description:</strong> {description}</p>
                  <p><strong>Source Type:</strong> {ingestType}</p>
                  {ingestType === "links" && (
                    <>
                      <p><strong>Link Type:</strong> {linkType}</p>
                      <p><strong>Link Value:</strong> {linkValue}</p>
                    </>
                  )}
                  {ingestType === "documents" && (
                    <p><strong>Files:</strong> {files ? files.length : 0} selected</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button type="button" onClick={() => setStep((s) => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Chatbot Site"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
