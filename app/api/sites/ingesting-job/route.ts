import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    try {
        // Run ingestion in background without blocking response
        setTimeout(async () => {
            try {
                const tablesToProcess = ["links", "qa_training", "text_training"];

                for (const tableName of tablesToProcess) {
                    const { data: rows, error } = await supabase
                        .from(tableName)
                        .select("*")
                        .eq("status", "pending");

                    if (error) {
                        console.error(`Error fetching ${tableName}:`, error);
                        continue;
                    }

                    if (!rows || rows.length === 0) continue;

                    for (const row of rows) {
                        const text =
                            (row.title || "") +
                            "\n" +
                            (row.description || "") +
                            "\n" +
                            (row.content || "");

                        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
                            chunkSize: 256,
                            chunkOverlap: 20,
                        });

                        const fileUrl =
                            row.file_name && row.site_id
                                ? `${process.env.SUPABASE_URL}/storage/v1/object/public/training_docs/${row.site_id}/${row.file_name}`
                                : row.url || "";

                        const splitDocuments = await splitter.createDocuments([text], [
                            {
                                url: fileUrl, // ✅ Attach URL or file path
                                id: row.id,
                                type: row.type || tableName,
                            },
                        ]);

                        await SupabaseVectorStore.fromDocuments(
                            splitDocuments,
                            new OpenAIEmbeddings(),
                            {
                                client: supabase,
                                tableName: "vectors",
                                queryName: "match_documents",
                            }
                        );

                        await supabase
                            .from(tableName)
                            .update({ status: "indexed" })
                            .eq("id", row.id);
                    }
                }

                console.log("✅ Ingestion complete for all tables.");
            } catch (error) {
                console.error("⚠ Background ingestion failed:", error);
            }
        }, 0);

        return NextResponse.json({ message: "Ingestion process started" });
    } catch (error) {
        console.error("❌ Ingestion route error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
