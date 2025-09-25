"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { MessageSquare, Plus, Edit, Trash2, Search } from "lucide-react"
import { useSiteQATrainingStore } from "@/store/useSiteQATrainingStore"

export default function QATrainingPage() {
  const params = useParams()
  const siteId = params.id as string

  const { qa, fetchQA, addQA, editQA, deleteQA } = useSiteQATrainingStore()

  const [isAddingQA, setIsAddingQA] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Load Q&A from supabase when siteId changes
  useEffect(() => {
    if (siteId) fetchQA(siteId)
  }, [siteId, fetchQA])

  const filteredQA = qa.filter(
    (item: any) =>
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()),
  )

  const categories = [...new Set(qa.map((item: any) => item.category).filter(Boolean))]

  const handleAddQA = async () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      await addQA(siteId, newQuestion, newAnswer)
      setNewQuestion("")
      setNewAnswer("")
      setIsAddingQA(false)
    }
  }

  const handleEdit = async (id: string) => {
    const updatedQ = prompt("Enter new question:")
    const updatedA = prompt("Enter new answer:")
    if (updatedQ && updatedA) {
      await editQA(id, updatedQ, updatedA)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this Q&A pair?")) {
      await deleteQA(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Q&A</h1>
          <p className="text-muted-foreground">Create question and answer pairs to train your AI chatbot</p>
        </div>
        <Dialog open={isAddingQA} onOpenChange={setIsAddingQA}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Q&A
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Question & Answer</DialogTitle>
              <DialogDescription>
                Create a new question and answer pair to improve your chatbot's responses
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="Enter the question users might ask"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Enter the answer your chatbot should provide"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingQA(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddQA} disabled={!newQuestion.trim() || !newAnswer.trim()}>
                  Add Q&A
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{qa.length}</div>
                <p className="text-xs text-muted-foreground">Q&A Pairs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {qa.length > 0
                    ? Math.round(qa.reduce((sum: any, item: any) => sum + item.answer.length, 0) / qa.length)
                    : 0}
                </div>
                <p className="text-xs text-muted-foreground">Avg Answer Length</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {
                    qa.filter(
                      (item: any) =>
                        new Date(item.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Added This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Q&A pairs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Q&A Table */}
      <Card>
        <CardHeader>
          <CardTitle>Question & Answer Pairs</CardTitle>
          <CardDescription>Manage your Q&A training data ({filteredQA.length} items)</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QUESTION</TableHead>
                <TableHead>ANSWER</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>DATE ADDED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQA.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-xs">
                    <p className="font-medium text-sm line-clamp-2">{item.question}</p>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.answer}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category ?? "Uncategorized"}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : "-"}
                  </TableCell>
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
