import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!
  );

  try {
    setTimeout(async () => {
      try {
        const tablesToProcess = ["links", "qa_training", "text_training"];

        for (const tableName of tablesToProcess) {
          const { data: rows } = await supabase
            .from(tableName)
            .select("*")
            .eq("status", "pending");

          if (!rows || rows.length === 0) continue;

          for (const row of rows) {
            const text = (row.title || "") + "\n" + (row.description || "") + "\n" + (row.content || "");

            const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
              chunkSize: 256,
              chunkOverlap: 20,
            });

            const splitDocuments = await splitter.createDocuments([text]);

            await SupabaseVectorStore.fromDocuments(
              splitDocuments,
              new OpenAIEmbeddings(),
              {
                client: supabase,
                tableName: "embeddings",
                queryName: "match_documents",
              }
            );

            // Mark processed item
            await supabase
              .from(tableName)
              .update({ status: "indexed" })
              .eq("id", row.id);
          }
        }

        console.log("Ingestion complete for all tables.");
      } catch (error) {
        console.error("Background ingestion failed:", error);
      }
    }, 0);

    return NextResponse.json({ message: "Ingestion process started" });
  } catch (error) {
    console.error("Ingestion route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
