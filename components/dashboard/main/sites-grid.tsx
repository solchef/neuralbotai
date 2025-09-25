"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SitesGrid({ sites }: any) {
    if (!sites || sites.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-20">
                    <div className="bg-primary/10 rounded-full p-6 mb-6">
                        <Bot className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">No chatbots yet</h3>
                    <p className="text-muted-foreground text-center mb-8 max-w-md text-lg">
                        Create your first AI chatbot to start delivering intelligent customer support.
                    </p>
                    <Link href="/dashboard/sites/new">
                        <Button size="lg" className="glow-primary">
                            <Plus className="h-5 w-5 mr-2" /> Create Your First Chatbot
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sites.map((site: any) => (
                <Card key={site.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl truncate">{site.title}</CardTitle>
                            <Badge>{site.status}</Badge>
                        </div>
                        <CardDescription>{site.domain || "No domain configured"}</CardDescription>
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
                                <Button variant="outline" size="sm">Manage</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
