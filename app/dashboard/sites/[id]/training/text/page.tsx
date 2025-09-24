"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Edit, Trash2 } from "lucide-react"

export default function TextTrainingPage() {
  const params = useParams()
  const siteId = params.id as string

  const [isAddingText, setIsAddingText] = useState(false)
  const [newTextTitle, setNewTextTitle] = useState("")
  const [newTextContent, setNewTextContent] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  // Mock text data
  const textData = [
    {
      id: "1",
      title: "Company Overview",
      content:
        "Neural.ai is a leading AI chatbot platform that helps businesses automate customer support and engagement. Our advanced natural language processing technology enables businesses to create intelligent chatbots that can understand and respond to customer queries in real-time.",
      chars: 245,
      dateAdded: "2024-01-15",
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      title: "Product Features",
      content:
        "Our platform offers easy chatbot creation, multi-channel integration, advanced analytics, and seamless deployment options. Users can train their bots using various data sources including websites, documents, and custom text.",
      chars: 198,
      dateAdded: "2024-01-14",
      lastModified: "2024-01-16",
    },
    {
      id: "3",
      title: "Pricing Information",
      content:
        "We offer flexible pricing plans starting from a free tier for small businesses to enterprise solutions for large organizations. All plans include core features with varying limits on queries and integrations.",
      chars: 187,
      dateAdded: "2024-01-13",
      lastModified: "2024-01-13",
    },
  ]

  const totalChars = textData.reduce((sum, item) => sum + item.chars, 0)

  const handleAddText = () => {
    if (newTextTitle.trim() && newTextContent.trim()) {
      console.log("Adding text:", { title: newTextTitle, content: newTextContent })
      setNewTextTitle("")
      setNewTextContent("")
      setIsAddingText(false)
    }
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    console.log("Saving text:", id)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this text entry?")) {
      console.log("Deleting text:", id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Text</h1>
          <p className="text-muted-foreground">Add custom text content to train your AI chatbot</p>
        </div>
        <Dialog open={isAddingText} onOpenChange={setIsAddingText}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Text
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Text Content</DialogTitle>
              <DialogDescription>Add custom text content to help train your AI chatbot</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-title">Title</Label>
                <Input
                  id="text-title"
                  placeholder="Enter a title for this text content"
                  value={newTextTitle}
                  onChange={(e) => setNewTextTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="text-content">Content</Label>
                <Textarea
                  id="text-content"
                  placeholder="Enter your text content here..."
                  value={newTextContent}
                  onChange={(e) => setNewTextContent(e.target.value)}
                  rows={10}
                />
                <p className="text-xs text-muted-foreground mt-1">Characters: {newTextContent.length}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingText(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddText} disabled={!newTextTitle.trim() || !newTextContent.trim()}>
                  Add Text
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{textData.length}</div>
                <p className="text-xs text-muted-foreground">Text Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{totalChars.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Characters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{Math.round(totalChars / textData.length)}</div>
                <p className="text-xs text-muted-foreground">Avg Characters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Text Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Text Entries</CardTitle>
          <CardDescription>Manage your custom text content for AI training</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TITLE</TableHead>
                <TableHead>CONTENT</TableHead>
                <TableHead>CHARACTERS</TableHead>
                <TableHead>DATE ADDED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {textData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.chars.toLocaleString()}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{new Date(item.dateAdded).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
