// "use client"

// import React from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, Globe, Settings, BarChart3, RefreshCw, Code, ExternalLink } from "lucide-react"

// type SitePageClientProps = {
//     site: {
//         id: string;
//         title: string;
//         status: string;
//         widget_token_hash: string;
//         ingest_last_run?: string | null;
//     };
//     recentChats: any; // Replace 'any' with a more specific type if available
//     totalQueries: number;
// };

// export default function SitePageClient({ site, recentChats, totalQueries }: SitePageClientProps) {
//     const embedCode = `<script>
// (function() {
//   var script = document.createElement('script');
//   script.src = '${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/widget.js';
//   script.setAttribute('data-site-id', '${site.id}');
//   script.setAttribute('data-token', '${site.widget_token_hash}');
//   document.head.appendChild(script);
// })();
// </script>`

//     const handleCopy = () => {
//         navigator.clipboard.writeText(embedCode)
//     }

//     return (
//         <div className="min-h-screen bg-background">
//             {/* Header */}
//             {/* <div className="border-b border-border">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                             <Link href="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
//                                 <ArrowLeft className="h-4 w-4" />
//                                 <span>Back to Dashboard</span>
//                             </Link>
//                             <div className="h-6 w-px bg-border" />
//                             <h1 className="text-lg font-semibold">{site.title}</h1>
//                             <Badge variant={site.status === "ready" ? "default" : "secondary"}>{site.status}</Badge>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Button variant="outline" size="sm" onClick={() => console.log("Re-ingest clicked")}>
//                                 <RefreshCw className="h-4 w-4 mr-2" />
//                                 Re-ingest
//                             </Button>
//                             <Link href={`/dashboard/sites/${site.id}/settings`}>
//                                 <Button variant="outline" size="sm">
//                                     <Settings className="h-4 w-4 mr-2" />
//                                     Settings
//                                 </Button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}

//             {/* Main Content */}
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="grid lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Overview */}
//                         <div className="grid md:grid-cols-3 gap-4">
//                             <Card>
//                                 <CardContent>
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Total Queries</p>
//                                             <p className="text-2xl font-bold">{totalQueries}</p>
//                                         </div>
//                                         <BarChart3 className="h-8 w-8 text-muted-foreground" />
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                             <Card>
//                                 <CardContent>
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Status</p>
//                                             <p className="text-2xl font-bold capitalize">{site.status}</p>
//                                         </div>
//                                         <Globe className="h-8 w-8 text-muted-foreground" />
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                             <Card>
//                                 <CardContent>
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Last Updated</p>
//                                             <p className="text-sm font-medium">
//                                                 {site.ingest_last_run ? new Date(site.ingest_last_run).toLocaleDateString() : "Never"}
//                                             </p>
//                                         </div>
//                                         <RefreshCw className="h-8 w-8 text-muted-foreground" />
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* Tabs */}
//                         <Tabs defaultValue="overview" className="space-y-6">
//                             <TabsList>
//                                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                                 <TabsTrigger value="embed">Embed Code</TabsTrigger>
//                                 <TabsTrigger value="logs">Recent Chats</TabsTrigger>
//                             </TabsList>

//                             <TabsContent value="embed">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2">
//                                             <Code className="h-5 w-5" />
//                                             Embed Code
//                                         </CardTitle>
//                                         <CardDescription>
//                                             Copy and paste this code into your website’s HTML
//                                         </CardDescription>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
//                                             <code>{embedCode}</code>
//                                         </pre>
//                                         <Button variant="outline" onClick={handleCopy}>Copy to Clipboard</Button>
//                                     </CardContent>
//                                 </Card>
//                             </TabsContent>
//                         </Tabs>
//                     </div>

//                     {/* Sidebar */}
//                     <div className="space-y-6">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Quick Actions</CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-3">
//                                 <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => console.log("Re-ingest")}>
//                                     <RefreshCw className="h-4 w-4 mr-2" />
//                                     Re-ingest Content
//                                 </Button>
//                                 <Link href={`/dashboard/sites/${site.id}/settings`}>
//                                     <Button variant="outline" className="w-full justify-start bg-transparent">
//                                         <Settings className="h-4 w-4 mr-2" />
//                                         Site Settings
//                                     </Button>
//                                 </Link>
//                                 <Link href={`/dashboard/sites/${site.id}/analytics`}>
//                                     <Button variant="outline" className="w-full justify-start bg-transparent">
//                                         <BarChart3 className="h-4 w-4 mr-2" />
//                                         View Analytics
//                                     </Button>
//                                 </Link>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


"use client"

import { useEffect } from "react"
import { Code, BarChart3, Globe, RefreshCw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useSitesStore } from "@/store/useSitesStore"

type Props = { siteId: string }

export default function SitePageClient({ siteId }: Props) {
    const { site, recentChats, totalQueries, fetchSiteData } = useSitesStore()

    useEffect(() => {
        fetchSiteData(siteId)
    }, [siteId, fetchSiteData])

    if (!site) {
        return <div className="p-6">Loading site…</div>
    }

    const embedCode = `<script>
        (function() {
        var script = document.createElement('script');
        script.src = '${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/widget.js';
        script.setAttribute('data-site-id', '${site.id}');
        script.setAttribute('data-token', '${site.widget_token_hash}');
        document.head.appendChild(script);
        })();
        </script>`

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Queries</p>
                                            <p className="text-2xl font-bold">{totalQueries}</p>
                                        </div>
                                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <p className="text-2xl font-bold capitalize">{site.status}</p>
                                        </div>
                                        <Globe className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Last Updated</p>
                                            <p className="text-sm font-medium">
                                                {site.ingest_last_run ? new Date(site.ingest_last_run).toLocaleDateString() : "Never"}
                                            </p>
                                        </div>
                                        <RefreshCw className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="embed">Embed Code</TabsTrigger>
                                <TabsTrigger value="logs">Recent Chats</TabsTrigger>
                            </TabsList>

                            <TabsContent value="embed">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Code className="h-5 w-5" />
                                            Embed Code
                                        </CardTitle>
                                        <CardDescription>Copy and paste this code into your website’s HTML</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                            <code>{embedCode}</code>
                                        </pre>
                                        <Button variant="outline" onClick={handleCopy}>
                                            Copy to Clipboard
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => console.log("Re-ingest")}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Re-ingest Content
                                </Button>
                                <Link href={`/dashboard/sites/${site.id}/settings`}>
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Site Settings
                                    </Button>
                                </Link>
                                <Link href={`/dashboard/sites/${site.id}/analytics`}>
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        View Analytics
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
