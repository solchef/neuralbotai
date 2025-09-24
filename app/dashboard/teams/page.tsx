"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Users, MoreHorizontal, Mail, Shield, Crown, User, Settings, Trash2, UserPlus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  const teamMembers = [
    {
      id: "1",
      name: "James Waweru Chege",
      email: "jawery@gmail.com",
      role: "owner",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-02-01",
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@company.com",
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-02-15",
      lastActive: "3 days ago",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-03-01",
      lastActive: "1 week ago",
      status: "inactive",
    },
  ]

  const pendingInvites = [
    {
      id: "1",
      email: "john@company.com",
      role: "member",
      invitedBy: "James Waweru Chege",
      invitedAt: "2024-03-15",
    },
    {
      id: "2",
      email: "lisa@company.com",
      role: "admin",
      invitedBy: "Sarah Johnson",
      invitedAt: "2024-03-14",
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "admin":
        return <Shield className="h-4 w-4 text-blue-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      owner: "bg-yellow-100 text-yellow-800",
      admin: "bg-blue-100 text-blue-800",
      member: "bg-gray-100 text-gray-800",
    }
    return variants[role as keyof typeof variants] || variants.member
  }

  const handleInvite = () => {
    if (!inviteEmail) return
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${inviteEmail}`,
    })
    setInviteEmail("")
    setIsInviteOpen(false)
  }

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">Manage your team members and their access to Neural AI chatbots.</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your Neural AI team.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite}>Send Invitation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Owner</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Admins</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{pendingInvites.length}</div>
                <div className="text-sm text-muted-foreground">Pending Invites</div>
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
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Joined {member.joinedAt} • Last active {member.lastActive}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getRoleBadge(member.role)}>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(member.role)}
                      {member.role}
                    </div>
                  </Badge>
                  <Badge variant={member.status === "active" ? "secondary" : "outline"}>{member.status}</Badge>
                  {member.role !== "owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Invitations waiting for acceptance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">{invite.email}</div>
                    <div className="text-sm text-muted-foreground">
                      Invited by {invite.invitedBy} on {invite.invitedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getRoleBadge(invite.role)}>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(invite.role)}
                        {invite.role}
                      </div>
                    </Badge>
                    <Badge variant="outline">Pending</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Resend Invitation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Invitation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
