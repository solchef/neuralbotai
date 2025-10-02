"use client"
import { createClient } from "../client"
const supabase = createClient()

export const getSites = async (tenantId: string) => {
    const { data, error } = await supabase
        .from("sites")
        .select("*")
        .eq("tenant_id", tenantId)
    if (error) throw error
    return data
}

export const getSiteById = async (siteId: string) => {
    const { data, error } = await supabase
        .from("sites")
        .select("*")
        .eq("id", siteId)
        .single()
    if (error) throw error
    return data
}

export const createSite = async (input: {
    tenantId: string
    title: string
    description?: string
    domain?: string
    crawlSettings?: {
        max_depth: number
        max_pages: number
        exclude_patterns: string[]
    }
}) => {
    const widgetToken = crypto.randomUUID()

    const { data: site, error: siteError } = await supabase
        .from("sites")
        .insert({
            tenant_id: input.tenantId,
            title: input.title,
            description: input.description || null,
            domain: input.domain || null,
            status: "pending",
            widget_token_hash: widgetToken,
            crawl_settings: input.crawlSettings,
        })
        .select("*")
        .single()

    if (siteError) throw siteError

    const { error: usageError } = await supabase.from("usage").insert({
        tenant_id: input.tenantId,
        site_id: site.id,
        date: new Date().toISOString().split("T")[0],
    })
    if (usageError) throw usageError

    return site
}

export const updateSiteStatus = async (siteId: string, status: "pending" | "crawling" | "ready" | "error") => {
    const { data, error } = await supabase
        .from("sites")
        .update({ status })
        .eq("id", siteId)
        .select()
        .single()

    if (error) throw error
    return data
}
