import { requireAuth, getCurrentTenant } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, MessageSquare, Users, TrendingUp, Clock, Zap, Bot, Database, Activity } from "lucide-react"

export default async function DashboardPage() {
    const user = await requireAuth()
    const tenant = await getCurrentTenant()
    const supabase = await createClient()


    // Get sites for this tenant
    const { data: sites } = await supabase
        .from("sites")
        .select("*")
        .eq("tenant_id", tenant.id)
        .order("created_at", { ascending: false })

    // Get usage stats for current month
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01"
    const { data: usage } = await supabase
        .from("usage")
        .select("queries_count")
        .eq("tenant_id", tenant.id)
        .gte("date", currentMonth)

    const totalQueries = usage?.reduce((sum, day) => sum + day.queries_count, 0) || 0
    const planLimit = tenant.plan?.monthly_queries || 0

    // Get team members count
    const { count: teamMembersCount } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("tenant_id", tenant.id)

    return (
        <div className="space-y-10">
            {/* <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl" />
                <div className="relative p-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-3">
                        Welcome back, {user.user_metadata?.name || user.email?.split("@")[0]}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Monitor your AI chatbots, analyze performance, and scale your conversational AI platform.
                    </p>
                </div>
            </div> */}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Chatbots</CardTitle>
                        <Bot className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{sites?.length || 0}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {sites?.filter((site) => site.status === "ready").length || 0} ready to serve
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages This Month</CardTitle>
                        <MessageSquare className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{totalQueries.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {planLimit > 0 ? `of ${planLimit.toLocaleString()} limit` : "Unlimited usage"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{teamMembersCount || 0}</div>
                        <p className="text-sm text-muted-foreground mt-1">Collaborating members</p>
                    </CardContent>
                </Card>

                <Card className="border-border glow-card hover:border-primary/20 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plan Usage</CardTitle>
                        <Activity className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">
                            {planLimit > 0 ? Math.round((totalQueries / planLimit) * 100) : 0}%
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Monthly consumption</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">AI Chatbot Management</h2>
                        <p className="text-lg text-muted-foreground mt-2">
                            Deploy, monitor, and optimize your intelligent assistants
                        </p>
                    </div>
                    <Link href="/dashboard/sites/new">
                        <Button size="lg" className="glow-primary">
                            <Plus className="h-5 w-5 mr-2" />
                            Create New Chatbot
                        </Button>
                    </Link>
                </div>

                {sites && sites.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {sites.map((site) => (
                            <Card key={site.id} className="glow-card hover:border-primary/20 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl truncate group-hover:text-primary transition-colors">
                                            {site.title}
                                        </CardTitle>
                                        <Badge
                                            variant={site.status === "ready" ? "default" : "secondary"}
                                            className={site.status === "ready" ? "bg-green-600 hover:bg-green-700" : ""}
                                        >
                                            {site.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="truncate text-base">
                                        {site.domain || "No domain configured"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {site.ingest_last_run
                                                ? `Updated ${new Date(site.ingest_last_run).toLocaleDateString()}`
                                                : "Never updated"}
                                        </div>
                                        <Link href={`/dashboard/sites/${site.id}`}>
                                            <Button variant="outline" size="sm" className="group-hover:border-primary/50 bg-transparent">
                                                Manage
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-border glow-card">
                        <CardContent className="flex flex-col items-center justify-center py-20">
                            <div className="bg-primary/10 rounded-full p-6 mb-6">
                                <Bot className="h-16 w-16 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">No chatbots yet</h3>
                            <p className="text-muted-foreground text-center mb-8 max-w-md text-lg">
                                Create your first AI chatbot to start delivering intelligent customer support and engagement.
                            </p>
                            <Link href="/dashboard/sites/new">
                                <Button size="lg" className="glow-primary">
                                    <Plus className="h-5 w-5 mr-2" />
                                    Create Your First Chatbot
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Quick Actions</h2>
                    <p className="text-lg text-muted-foreground mt-2">Access key features and manage your AI platform</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Link href="/dashboard/analytics">
                        <Card className="glow-card hover:border-primary/20 transition-all duration-300 cursor-pointer group">
                            <CardContent className="flex items-center p-8">
                                <div className="bg-primary/10 rounded-full p-4 mr-6 group-hover:bg-primary/20 transition-colors">
                                    <TrendingUp className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">Analytics</h4>
                                    <p className="text-sm text-muted-foreground">Performance insights</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/teams">
                        <Card className="glow-card hover:border-primary/20 transition-all duration-300 cursor-pointer group">
                            <CardContent className="flex items-center p-8">
                                <div className="bg-primary/10 rounded-full p-4 mr-6 group-hover:bg-primary/20 transition-colors">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">Team</h4>
                                    <p className="text-sm text-muted-foreground">Manage collaborators</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/knowledge">
                        <Card className="glow-card hover:border-primary/20 transition-all duration-300 cursor-pointer group">
                            <CardContent className="flex items-center p-8">
                                <div className="bg-primary/10 rounded-full p-4 mr-6 group-hover:bg-primary/20 transition-colors">
                                    <Database className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">Knowledge</h4>
                                    <p className="text-sm text-muted-foreground">Training data</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/billing">
                        <Card className="glow-card hover:border-primary/20 transition-all duration-300 cursor-pointer group">
                            <CardContent className="flex items-center p-8">
                                <div className="bg-primary/10 rounded-full p-4 mr-6 group-hover:bg-primary/20 transition-colors">
                                    <Zap className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">Billing</h4>
                                    <p className="text-sm text-muted-foreground">Usage & plans</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}
