// "use client"

// import { useState } from "react"
// import { useParams } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { MessageSquare, Search, Download, ThumbsUp, ThumbsDown, Clock, User, Bot, MoreHorizontal } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// export default function ConversationsPage() {
//   const params = useParams()
//   const siteId = params.id as string

//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [satisfactionFilter, setSatisfactionFilter] = useState("all")
//   const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

//   // Mock conversation data
//   const conversations = [
//     {
//       id: "1",
//       user: { name: "John Doe", email: "john@example.com", avatar: null },
//       status: "completed",
//       satisfaction: "positive",
//       messageCount: 8,
//       startTime: "2024-01-15T10:30:00Z",
//       endTime: "2024-01-15T10:45:00Z",
//       lastMessage: "Thank you for your help!",
//       tags: ["support", "billing"],
//       resolved: true,
//     },
//     {
//       id: "2",
//       user: { name: "Jane Smith", email: "jane@example.com", avatar: null },
//       status: "active",
//       satisfaction: "neutral",
//       messageCount: 3,
//       startTime: "2024-01-15T11:00:00Z",
//       endTime: null,
//       lastMessage: "I need help with my account",
//       tags: ["account"],
//       resolved: false,
//     },
//     {
//       id: "3",
//       user: { name: "Anonymous", email: null, avatar: null },
//       status: "completed",
//       satisfaction: "negative",
//       messageCount: 12,
//       startTime: "2024-01-15T09:15:00Z",
//       endTime: "2024-01-15T09:35:00Z",
//       lastMessage: "This didn't help at all",
//       tags: ["technical"],
//       resolved: false,
//     },
//   ]

//   const conversationMessages = {
//     "1": [
//       { id: "1", sender: "bot", content: "Hi! How can I help you today?", timestamp: "2024-01-15T10:30:00Z" },
//       { id: "2", sender: "user", content: "I have a question about my billing", timestamp: "2024-01-15T10:31:00Z" },
//       {
//         id: "3",
//         sender: "bot",
//         content: "I'd be happy to help with billing questions. What specifically would you like to know?",
//         timestamp: "2024-01-15T10:31:30Z",
//       },
//       { id: "4", sender: "user", content: "When is my next payment due?", timestamp: "2024-01-15T10:32:00Z" },
//       {
//         id: "5",
//         sender: "bot",
//         content: "Let me check that for you. Your next payment is due on January 30th, 2024.",
//         timestamp: "2024-01-15T10:32:30Z",
//       },
//       { id: "6", sender: "user", content: "Perfect, thank you!", timestamp: "2024-01-15T10:33:00Z" },
//       {
//         id: "7",
//         sender: "bot",
//         content: "You're welcome! Is there anything else I can help you with?",
//         timestamp: "2024-01-15T10:33:30Z",
//       },
//       { id: "8", sender: "user", content: "Thank you for your help!", timestamp: "2024-01-15T10:34:00Z" },
//     ],
//   }

//   const filteredConversations = conversations.filter((conv) => {
//     const matchesSearch =
//       searchQuery === "" ||
//       conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

//     const matchesStatus = statusFilter === "all" || conv.status === statusFilter
//     const matchesSatisfaction = satisfactionFilter === "all" || conv.satisfaction === satisfactionFilter

//     return matchesSearch && matchesStatus && matchesSatisfaction
//   })

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString()
//   }

//   const getDuration = (start: string, end: string | null) => {
//     if (!end) return "Ongoing"
//     const duration = new Date(end).getTime() - new Date(start).getTime()
//     const minutes = Math.floor(duration / 60000)
//     return `${minutes}m`
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Chat History</h1>
//           <p className="text-muted-foreground">View and manage all conversations with your chatbot</p>
//         </div>
//         <Button variant="outline" size="sm">
//           <Download className="h-4 w-4 mr-2" />
//           Export
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search conversations..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={satisfactionFilter} onValueChange={setSatisfactionFilter}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Satisfaction" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Ratings</SelectItem>
//                 <SelectItem value="positive">Positive</SelectItem>
//                 <SelectItem value="neutral">Neutral</SelectItem>
//                 <SelectItem value="negative">Negative</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Conversations List */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <MessageSquare className="h-5 w-5" />
//               Conversations ({filteredConversations.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <ScrollArea className="h-[600px]">
//               <div className="space-y-1 p-4">
//                 {filteredConversations.map((conversation) => (
//                   <div
//                     key={conversation.id}
//                     className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
//                       selectedConversation === conversation.id ? "bg-muted border-primary" : ""
//                     }`}
//                     onClick={() => setSelectedConversation(conversation.id)}
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={conversation.user.avatar || undefined} />
//                           <AvatarFallback>
//                             {conversation.user.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium text-sm">{conversation.user.name}</p>
//                           <p className="text-xs text-muted-foreground">{conversation.user.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
//                           {conversation.status}
//                         </Badge>
//                         {conversation.satisfaction === "positive" && <ThumbsUp className="h-4 w-4 text-green-600" />}
//                         {conversation.satisfaction === "negative" && <ThumbsDown className="h-4 w-4 text-red-600" />}
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="sm">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent>
//                             <DropdownMenuItem>View Details</DropdownMenuItem>
//                             <DropdownMenuItem>Export Chat</DropdownMenuItem>
//                             <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>

//                     <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{conversation.lastMessage}</p>

//                     <div className="flex items-center justify-between text-xs text-muted-foreground">
//                       <div className="flex items-center gap-4">
//                         <span className="flex items-center gap-1">
//                           <MessageSquare className="h-3 w-3" />
//                           {conversation.messageCount} messages
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           {getDuration(conversation.startTime, conversation.endTime)}
//                         </span>
//                       </div>
//                       <span>{formatTime(conversation.startTime)}</span>
//                     </div>

//                     {conversation.tags.length > 0 && (
//                       <div className="flex gap-1 mt-2">
//                         {conversation.tags.map((tag) => (
//                           <Badge key={tag} variant="outline" className="text-xs">
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </CardContent>
//         </Card>

//         {/* Conversation Detail */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Conversation Details</CardTitle>
//             <CardDescription>
//               {selectedConversation ? "View the full conversation thread" : "Select a conversation to view details"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {selectedConversation ? (
//               <div className="space-y-4">
//                 {/* Conversation Info */}
//                 <div className="p-4 bg-muted/50 rounded-lg">
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Started:</span>
//                       <p className="font-medium">
//                         {formatTime(conversations.find((c) => c.id === selectedConversation)?.startTime || "")}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Duration:</span>
//                       <p className="font-medium">
//                         {getDuration(
//                           conversations.find((c) => c.id === selectedConversation)?.startTime || "",
//                           conversations.find((c) => c.id === selectedConversation)?.endTime || null,
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <ScrollArea className="h-[400px]">
//                   <div className="space-y-4 pr-4">
//                     {conversationMessages[selectedConversation as keyof typeof conversationMessages]?.map((message) => (
//                       <div
//                         key={message.id}
//                         className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                       >
//                         {message.sender === "bot" && (
//                           <Avatar className="h-8 w-8">
//                             <AvatarFallback>
//                               <Bot className="h-4 w-4" />
//                             </AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`max-w-[80%] p-3 rounded-lg ${
//                             message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
//                           }`}
//                         >
//                           <p className="text-sm">{message.content}</p>
//                           <p className="text-xs opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
//                         </div>
//                         {message.sender === "user" && (
//                           <Avatar className="h-8 w-8">
//                             <AvatarFallback>
//                               <User className="h-4 w-4" />
//                             </AvatarFallback>
//                           </Avatar>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </ScrollArea>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-[400px] text-muted-foreground">
//                 <div className="text-center">
//                   <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p>Select a conversation to view details</p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Summary Stats */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">{conversations.length}</div>
//             <p className="text-xs text-muted-foreground">Total Conversations</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">{conversations.filter((c) => c.status === "active").length}</div>
//             <p className="text-xs text-muted-foreground">Active Conversations</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">
//               {Math.round(
//                 (conversations.filter((c) => c.satisfaction === "positive").length / conversations.length) * 100,
//               )}
//               %
//             </div>
//             <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">
//               {Math.round(conversations.reduce((acc, c) => acc + c.messageCount, 0) / conversations.length)}
//             </div>
//             <p className="text-xs text-muted-foreground">Avg Messages</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { useChatStore } from "@/store/useChatStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Search, Download, ThumbsUp, ThumbsDown, Clock, User, Bot, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ConversationsPage() {
  const params = useParams()
  const siteId = params.id as string

  const { siteConversations, sessionMessages, fetchSiteConversations, fetchSessionMessages } = useChatStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [satisfactionFilter, setSatisfactionFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  // 🔹 Load all conversations for this site
  useEffect(() => {
    if (siteId) fetchSiteConversations(siteId)
  }, [siteId, fetchSiteConversations])

  // 🔹 Load session messages when one is clicked
  useEffect(() => {
    if (selectedConversation) fetchSessionMessages(selectedConversation)
  }, [selectedConversation, fetchSessionMessages])

  // 🔹 Group chat_logs by session_id
  const conversations = useMemo(() => {
    console.log(siteConversations)
    const grouped: Record<string, any> = {}
    siteConversations.forEach((log) => {
      if (!grouped[log.sessionId]) {
        grouped[log.sessionId] = {
          id: log.sessionId,
          user: { name: "Anonymous", email: null, avatar: null },
          status: "completed", // default until you add session tracking
          satisfaction: "neutral", // placeholder
          messageCount: 0,
          startTime: log.timestamp,
          endTime: null,
          lastMessage: "",
          tags: [],
          resolved: false,
          messages: [],
        }
      }
      grouped[log.sessionId].messages.push(log)
      grouped[log.sessionId].messageCount = grouped[log.sessionId].messages.length
      grouped[log.sessionId].lastMessage = log.lastMessage
      grouped[log.sessionId].endTime = log.timestamp
    })
    return Object.values(grouped)
  }, [siteConversations])

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      searchQuery === "" ||
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || conv.status === statusFilter
    const matchesSatisfaction = satisfactionFilter === "all" || conv.satisfaction === satisfactionFilter

    return matchesSearch && matchesStatus && matchesSatisfaction
  })

  const formatTime = (timestamp: string) => new Date(timestamp).toLocaleString()

  const getDuration = (start: string, end: string | null) => {
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
          <p className="text-muted-foreground">View and manage all conversations with your chatbot</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
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
            <Select value={satisfactionFilter} onValueChange={setSatisfactionFilter}>
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
        </CardContent>
      </Card>

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
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation: any) => (
                  <div
                    key={conversation.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${selectedConversation === conversation.id ? "bg-muted border-primary" : ""
                      }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={conversation.user.avatar || undefined} />
                          <AvatarFallback>
                            {conversation.user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{conversation.user.name}</p>
                          <p className="text-xs text-muted-foreground">{conversation.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
                          {conversation.status}
                        </Badge>
                        {conversation.satisfaction === "positive" && <ThumbsUp className="h-4 w-4 text-green-600" />}
                        {conversation.satisfaction === "negative" && <ThumbsDown className="h-4 w-4 text-red-600" />}
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

                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{conversation.lastMessage}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {conversation.messageCount} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getDuration(conversation.startTime, conversation.endTime)}
                        </span>
                      </div>
                      <span>{formatTime(conversation.startTime)}</span>
                    </div>

                    {conversation.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {conversation.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
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
              {selectedConversation ? "View the full conversation thread" : "Select a conversation to view details"}
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
                          conversations.find((c: any) => c.id === selectedConversation)?.startTime || ""
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">
                        {getDuration(
                          conversations.find((c: any) => c.id === selectedConversation)?.startTime || "",
                          conversations.find((c: any) => c.id === selectedConversation)?.endTime || null
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                {/* Messages */}
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4 pr-4">
                    {sessionMessages.map((message: any) => (
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

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-muted-foreground">Total Conversations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {conversations.filter((c: any) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Active Conversations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(
                (conversations.filter((c: any) => c.satisfaction === "positive").length / conversations.length) * 100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(conversations.reduce((acc: number, c: any) => acc + c.messageCount, 0) / conversations.length)}
            </div>
            <p className="text-xs text-muted-foreground">Avg Messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
