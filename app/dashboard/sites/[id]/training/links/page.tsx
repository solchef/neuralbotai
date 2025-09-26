"use client"

import { useEffect, useRef, useState } from "react"
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
import { useSiteLinksTrainingStore, type Link } from "@/store/useSiteLinksTrainingStore"

export default function LinksTrainingPage() {
  const params = useParams()
  const siteId = params.id as string

  const {
    stats,
    links,
    fetchLinks,
    addLinks,
    retrainLinks,
    deleteLinks,
    uploadDocuments, // NEW
  } = useSiteLinksTrainingStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isAddingLinks, setIsAddingLinks] = useState(false)
  const [newLinks, setNewLinks] = useState("")

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    if (siteId) fetchLinks(siteId)
  }, [siteId, fetchLinks])
  // console.log(links)
  const filteredData = links.filter((item: Link) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase())

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

  const handleAddLinks = async () => {
    if (newLinks.trim()) {
      await addLinks(siteId, newLinks.split("\n"))
      setNewLinks("")
    }

    if (selectedFiles.length > 0) {
      await uploadDocuments(siteId, selectedFiles)
      setSelectedFiles([])
    }

    setIsAddingLinks(false)
  }

  const handleRetrain = async () => {
    await retrainLinks(selectedItems)
    setSelectedItems([])
  }

  const handleDelete = async () => {
    await deleteLinks(selectedItems)
    setSelectedItems([])
  }

  return (
    <div className="space-y-6">
      {/* ...Stats Cards and Actions Bar remain mostly unchanged... */}
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
                <Button><Plus className="h-4 w-4 mr-2" />Add Links / Upload Docs</Button>
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
                      placeholder="Enter URLs (one per line)"
                      value={newLinks}
                      onChange={(e) => setNewLinks(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Or drag and drop files here</p>
                    <p className="text-xs text-muted-foreground">Supported: PDF, DOC, TXT</p>

                    {/* Hidden file input */}
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files) setSelectedFiles(Array.from(e.target.files))
                      }}
                    />

                    {/* Choose Files button */}
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Files
                    </Button>

                    {/* Display selected file names */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 text-left">
                        <p className="font-medium mb-1">Selected files:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {selectedFiles.map((file) => (
                            <li key={file.name}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>


                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingLinks(false)}>Cancel</Button>
                    <Button onClick={handleAddLinks}>Add Training Data</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Data Table remains unchanged */}
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
                <TableHead>TYPE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: Link) => (
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
                      <img src={item.image || "/placeholder.svg"} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {item.title || item.file_name || item.url}
                          </a>
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{new Date(item.created_at).toLocaleString()}</TableCell>
                  <TableCell><Globe className="h-4 w-4" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
