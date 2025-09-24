"use client"

import { useState } from "react"
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

export default function QATrainingPage() {
  const params = useParams()
  const siteId = params.id as string

  const [isAddingQA, setIsAddingQA] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock Q&A data
  const qaData = [
    {
      id: "1",
      question: "What are your business hours?",
      answer:
        "We're open Monday through Friday from 9 AM to 6 PM EST. Our AI chatbot is available 24/7 to help with basic inquiries.",
      category: "General",
      dateAdded: "2024-01-15",
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your email.",
      category: "Account",
      dateAdded: "2024-01-14",
      lastModified: "2024-01-16",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
      category: "Billing",
      dateAdded: "2024-01-13",
      lastModified: "2024-01-13",
    },
    {
      id: "4",
      question: "Can I integrate the chatbot with my existing website?",
      answer:
        "Yes! Our chatbot can be easily integrated into any website using our JavaScript widget, WordPress plugin, or API integration.",
      category: "Technical",
      dateAdded: "2024-01-12",
      lastModified: "2024-01-14",
    },
    {
      id: "5",
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.",
      category: "Pricing",
      dateAdded: "2024-01-11",
      lastModified: "2024-01-11",
    },
  ]

  const filteredQA = qaData.filter(
    (item) =>
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = [...new Set(qaData.map((item) => item.category))]

  const handleAddQA = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      console.log("Adding Q&A:", { question: newQuestion, answer: newAnswer })
      setNewQuestion("")
      setNewAnswer("")
      setIsAddingQA(false)
    }
  }

  const handleEdit = (id: string) => {
    console.log("Editing Q&A:", id)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this Q&A pair?")) {
      console.log("Deleting Q&A:", id)
    }
  }

  return (
    <div className="space-y-6">
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
                <div className="text-2xl font-bold">{qaData.length}</div>
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
                  {Math.round(qaData.reduce((sum, item) => sum + item.answer.length, 0) / qaData.length)}
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
                    qaData.filter((item) => new Date(item.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                      .length
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
              {filteredQA.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-xs">
                    <p className="font-medium text-sm line-clamp-2">{item.question}</p>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.answer}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
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
