"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Plus,
  MoreHorizontal,
  FileText,
  Link,
  MessageSquare,
  Brain,
  TrendingUp,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react"

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const knowledgeItems = [
    {
      id: "1",
      title: "Product Documentation",
      description: "Complete guide to our product features and functionality",
      type: "document",
      category: "Product",
      content: "Comprehensive documentation covering all product features...",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-15",
      author: "James Waweru",
      status: "published",
      views: 1250,
      usageCount: 89,
    },
    {
      id: "2",
      title: "Pricing Information",
      description: "Current pricing plans and billing information",
      type: "qa",
      category: "Sales",
      content: "Q: What are your pricing plans? A: We offer three main plans...",
      createdAt: "2024-02-15",
      updatedAt: "2024-03-10",
      author: "Sarah Johnson",
      status: "published",
      views: 890,
      usageCount: 156,
    },
    {
      id: "3",
      title: "Technical Support FAQ",
      description: "Common technical issues and their solutions",
      type: "qa",
      category: "Support",
      content: "Q: How do I reset my password? A: You can reset your password...",
      createdAt: "2024-01-20",
      updatedAt: "2024-03-12",
      author: "Mike Chen",
      status: "published",
      views: 2100,
      usageCount: 234,
    },
    {
      id: "4",
      title: "Company Blog Posts",
      description: "Latest blog posts and announcements",
      type: "link",
      category: "Marketing",
      content: "https://company.com/blog - Latest updates and insights...",
      createdAt: "2024-03-05",
      updatedAt: "2024-03-14",
      author: "Emily Davis",
      status: "published",
      views: 567,
      usageCount: 45,
    },
    {
      id: "5",
      title: "API Documentation",
      description: "Developer API reference and examples",
      type: "document",
      category: "Technical",
      content: "Complete API documentation with examples and use cases...",
      createdAt: "2024-02-28",
      updatedAt: "2024-03-13",
      author: "James Waweru",
      status: "draft",
      views: 123,
      usageCount: 12,
    },
  ]

  const categories = ["Product", "Sales", "Support", "Marketing", "Technical"]
  const types = [
    { value: "document", label: "Document", icon: FileText },
    { value: "link", label: "Link", icon: Link },
    { value: "qa", label: "Q&A", icon: MessageSquare },
  ]

  const getTypeIcon = (type: string) => {
    const typeConfig = types.find((t) => t.value === type)
    const Icon = typeConfig?.icon || FileText
    return <Icon className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    return status === "published" ? (
      <Badge className="bg-green-100 text-green-800">Published</Badge>
    ) : (
      <Badge variant="outline">Draft</Badge>
    )
  }

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const totalViews = knowledgeItems.reduce((sum, item) => sum + item.views, 0)
  const totalUsage = knowledgeItems.reduce((sum, item) => sum + item.usageCount, 0)
  const publishedItems = knowledgeItems.filter((item) => item.status === "published").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground mt-2">Manage your chatbot's knowledge base and training content.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Knowledge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Knowledge Item</DialogTitle>
              <DialogDescription>Add new content to your chatbot's knowledge base.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="document" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="document">Document</TabsTrigger>
                <TabsTrigger value="link">Link</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>
              <TabsContent value="document" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-title">Title</Label>
                  <Input id="doc-title" placeholder="Enter document title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-content">Content</Label>
                  <textarea
                    id="doc-content"
                    className="w-full h-32 p-3 border rounded-md resize-none"
                    placeholder="Enter document content..."
                  />
                </div>
              </TabsContent>
              <TabsContent value="link" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input id="link-url" placeholder="https://example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-title">Title</Label>
                  <Input id="link-title" placeholder="Enter link title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="qa" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qa-question">Question</Label>
                  <Input id="qa-question" placeholder="Enter the question" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qa-answer">Answer</Label>
                  <textarea
                    id="qa-answer"
                    className="w-full h-24 p-3 border rounded-md resize-none"
                    placeholder="Enter the answer..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qa-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Knowledge</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Knowledge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{knowledgeItems.length}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{publishedItems}</div>
                <div className="text-sm text-muted-foreground">Published</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{totalUsage}</div>
                <div className="text-sm text-muted-foreground">AI Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Items */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Items</CardTitle>
          <CardDescription>Manage your chatbot's knowledge base content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-muted rounded-lg">{getTypeIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      {getStatusBadge(item.status)}
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {item.updatedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        {item.usageCount} AI uses
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
