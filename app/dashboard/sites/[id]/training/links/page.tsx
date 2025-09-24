"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  RefreshCw,
  Trash2,
  Plus,
  Upload,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function LinksTrainingPage() {
  const params = useParams()
  const siteId = params.id as string

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isAddingLinks, setIsAddingLinks] = useState(false)
  const [newLinks, setNewLinks] = useState("")

  // Mock data matching the image
  const crawlStats = {
    crawledLinks: 32,
    totalChars: "59.2K",
    maxChars: "500K",
    indexed: 31,
    pending: 0,
    failed: 0,
    noSpace: 0,
  }

  const crawledData = [
    {
      id: "1",
      status: "indexed",
      chars: 1401,
      data: {
        title: "Education & Learning",
        url: "https://sentseven.com/education",
        description: "Transforming education with digital platforms, sma...",
        image: "/diverse-students-learning.png",
      },
      dateAdded: "Sep 23/2025 12:29AM",
      retrain: "-",
      type: "website",
    },
    {
      id: "2",
      status: "indexed",
      chars: 1374,
      data: {
        title: "Trading & FinTech",
        url: "https://sentseven.com/trading",
        description: "Advanced trading platforms and financial technology solutions...",
        image: "/stock-market-analysis.png",
      },
      dateAdded: "Sep 23/2025 12:29AM",
      retrain: "-",
      type: "website",
    },
    {
      id: "3",
      status: "pending",
      chars: 0,
      data: {
        title: "Healthcare Solutions",
        url: "https://sentseven.com/healthcare",
        description: "Digital healthcare platforms and telemedicine solutions...",
        image: "/healthcare-abstract.png",
      },
      dateAdded: "Sep 23/2025 12:30AM",
      retrain: "-",
      type: "website",
    },
  ]

  const filteredData = crawledData.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.data.url.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "no-space":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "indexed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "no-space":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    }
  }

  const handleAddLinks = () => {
    // Process new links
    console.log("Adding links:", newLinks)
    setNewLinks("")
    setIsAddingLinks(false)
  }

  const handleRetrain = () => {
    console.log("Retraining bot with selected items:", selectedItems)
  }

  const handleDelete = () => {
    console.log("Deleting selected items:", selectedItems)
    setSelectedItems([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Links</h1>
          <p className="text-muted-foreground">Manage website links and documents for training your AI</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{crawlStats.crawledLinks}</div>
                <p className="text-xs text-muted-foreground">Crawled Links</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{crawlStats.totalChars}</div>
                <p className="text-xs text-muted-foreground">/ {crawlStats.maxChars}</p>
                <p className="text-xs text-muted-foreground">Chars</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{crawlStats.indexed}</div>
                <p className="text-xs text-muted-foreground">Indexed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{crawlStats.pending}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{crawlStats.failed}</div>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{crawlStats.noSpace}</div>
                <p className="text-xs text-muted-foreground">No Space</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={handleRetrain} disabled={selectedItems.length === 0}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retrain the bot
              </Button>
              <Button variant="outline" onClick={handleDelete} disabled={selectedItems.length === 0}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            <Dialog open={isAddingLinks} onOpenChange={setIsAddingLinks}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Links / Upload Docs
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Training Data</DialogTitle>
                  <DialogDescription>Add website links or upload documents to train your AI chatbot</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="links">Website Links</Label>
                    <Textarea
                      id="links"
                      placeholder="Enter website URLs (one per line)&#10;https://example.com&#10;https://example.com/about&#10;https://example.com/contact"
                      value={newLinks}
                      onChange={(e) => setNewLinks(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Or drag and drop files here</p>
                    <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX, TXT</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Choose Files
                    </Button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingLinks(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddLinks}>Add Training Data</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <p className="text-sm text-muted-foreground">{filteredData.length} total items</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>CHARS</TableHead>
                <TableHead>DATA</TableHead>
                <TableHead>DATE ADDED</TableHead>
                <TableHead>RETRAIN</TableHead>
                <TableHead>TYPE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <Badge variant="secondary" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.chars.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-3 max-w-md">
                      <img
                        src={item.data.image || "/placeholder.svg"}
                        alt=""
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          <a
                            href={item.data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.data.title}
                          </a>
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.data.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{item.dateAdded}</TableCell>
                  <TableCell>{item.retrain}</TableCell>
                  <TableCell>
                    <Globe className="h-4 w-4" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
