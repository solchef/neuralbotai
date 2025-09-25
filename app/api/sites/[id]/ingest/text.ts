import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const text = body.text;

    if (process.env.NEXT_PUBLIC_DEMO === "true") {
        return NextResponse.json(
            {
                error: [
                    "Ingest is not supported in demo mode."
                ].join("\n"),
            },
            { status: 403 },
        );
    }

    try {
        const client = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PRIVATE_KEY!,
        );

        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize: 256,
            chunkOverlap: 20,
        });

        const splitDocuments = await splitter.createDocuments([text]);

        const vectorstore = await SupabaseVectorStore.fromDocuments(
            splitDocuments,
            new OpenAIEmbeddings(),
            {
                client,
                tableName: "documents",
                queryName: "match_documents",
            },
        );

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}