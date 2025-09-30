"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useChatStore } from "@/store/useChatStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Search,
  Download,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Bot,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ConversationsPage() {
  const params = useParams()
  const siteId = params.id as string

  const {
    sessions,
    sessionMessages,
    fetchSessions,
    fetchSessionMessages,
  } = useChatStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [satisfactionFilter, setSatisfactionFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  // 🔹 Load sessions
  useEffect(() => {
    if (siteId) fetchSessions(siteId)
  }, [siteId, fetchSessions])

  // 🔹 Load session messages when one is clicked
  useEffect(() => {
    if (selectedConversation) fetchSessionMessages(selectedConversation)
  }, [selectedConversation, fetchSessionMessages])

  // 🔹 Filters
  const filteredConversations = sessions.filter((conv) => {
    const matchesSearch =
      searchQuery === "" ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? conv.endedAt === null
          : conv.endedAt !== null

    const matchesSatisfaction =
      satisfactionFilter === "all" || conv.satisfaction === satisfactionFilter

    return matchesSearch && matchesStatus && matchesSatisfaction
  })

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleString()

  const getDuration = (start: string, end: string | null | undefined) => {
    if (!end) return "Ongoing"
    const duration = new Date(end).getTime() - new Date(start).getTime()
    const minutes = Math.floor(duration / 60000)
    return `${minutes}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat History</h1>
          <p className="text-muted-foreground">
            View and manage all conversations with your chatbot
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {sessions.filter((c) => !c.endedAt).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active Conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(
                (sessions.filter((c) => c.satisfaction === "positive").length /
                  (sessions.length || 1)) *
                100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(
                sessions.reduce((acc, c) => acc + c.messageCount, 0) /
                (sessions.length || 1)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Avg Messages</p>
          </CardContent>
        </Card>
      </div>



      <div className="grid lg:grid-cols-2 gap-6">


        {/* Conversations List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations ({filteredConversations.length})
            </CardTitle>
          </CardHeader>


          <CardContent className="p-0">
            {/* Filters */}
            <div className="flex gap-4 px-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={satisfactionFilter}
                onValueChange={setSatisfactionFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Satisfaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.sessionId}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${selectedConversation === conversation.sessionId
                      ? "bg-muted border-primary"
                      : ""
                      }`}
                    onClick={() => setSelectedConversation(conversation.sessionId)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Anonymous</p>
                          <p className="text-xs text-muted-foreground">
                            {conversation.sessionId}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            conversation.endedAt ? "secondary" : "default"
                          }
                        >
                          {conversation.endedAt ? "completed" : "active"}
                        </Badge>
                        {conversation.satisfaction === "positive" && (
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                        )}
                        {conversation.satisfaction === "negative" && (
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export Chat</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {conversation.lastMessage}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {conversation.messageCount} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getDuration(
                            conversation.startedAt,
                            conversation.endedAt
                          )}
                        </span>
                      </div>
                      <span>{formatTime(conversation.startedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation Details</CardTitle>
            <CardDescription>
              {selectedConversation
                ? "View the full conversation thread"
                : "Select a conversation to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Conversation Info */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">
                        {formatTime(
                          sessions.find(
                            (c) => c.sessionId === selectedConversation
                          )?.startedAt || ""
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">
                        {getDuration(
                          sessions.find(
                            (c) => c.sessionId === selectedConversation
                          )?.startedAt || "",
                          sessions.find(
                            (c) => c.sessionId === selectedConversation
                          )?.endedAt || null
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                {/* Messages */}
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4 pr-4">
                    {sessionMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "bot" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>


    </div>
  )
}
