import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const baseUrl = "https://www.centseven.com";
        if (!baseUrl) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

        const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PRIVATE_KEY!);
        const visited = new Set<string>();

        async function crawl(url: string) {
            if (visited.has(url)) return;
            visited.add(url);

            let html: string;
            try {
                const res = await fetch(url);
                html = await res.text();
            } catch {
                return; // skip failed requests
            }

            const $ = cheerio.load(html);

            // Remove scripts, styles, and unwanted tags
            $("script, style, meta, link, noscript").remove();

            const text = $("body").text().replace(/\s+/g, " ").trim();
            if (text.length > 20) {
                const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
                    chunkSize: 256,
                    chunkOverlap: 20,
                });
                let docs = await splitter.createDocuments([text]);
                docs.forEach((doc) => (doc.metadata.url = url));
                docs = docs.filter((d) => d.pageContent.trim().length > 20);

                const batchSize = 5;
                for (let i = 0; i < docs.length; i += batchSize) {
                    const batch = docs.slice(i, i + batchSize);
                    await SupabaseVectorStore.fromDocuments(batch, new OpenAIEmbeddings(), {
                        client,
                        tableName: "documents",
                    });
                    await new Promise((r) => setTimeout(r, 200)); // small delay
                }
            }

            // Crawl internal links
            const links = $("a[href]")
                .map((_, a) => $(a).attr("href"))
                .get()
                .filter((link) => link && link.startsWith("/") || link.startsWith(baseUrl));

            for (const link of links) {
                const nextUrl = link.startsWith("http") ? link : new URL(link, url).toString();
                await crawl(nextUrl);
            }
        }

        await crawl(baseUrl);

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Crawl error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}