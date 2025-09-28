// import { NextRequest, NextResponse } from "next/server";
// import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

// import { createClient } from "@supabase/supabase-js";

// import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// import { Document } from "@langchain/core/documents";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { BytesOutputParser, StringOutputParser } from "@langchain/core/output_parsers";

// export const runtime = "edge";

// const combineDocumentsFn = (docs: Document[]) => docs.map((doc) => doc.pageContent).join("\n\n");

// const formatVercelMessages = (chatHistory: VercelChatMessage[]) =>
//   chatHistory
//     .map((message) => {
//       if (message.role === "user") return `Human: ${message.content}`;
//       if (message.role === "assistant") return `Assistant: ${message.content}`;
//       return `${message.role}: ${message.content}`;
//     })
//     .join("\n");

// const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

// <chat_history>
//   {chat_history}
// </chat_history>

// Follow Up Input: {question}
// Standalone question:`;

// const condenseQuestionPrompt = PromptTemplate.fromTemplate(CONDENSE_QUESTION_TEMPLATE);

// const ANSWER_TEMPLATE = `You are Sentseven, an AI agent representing an innovative IT solutions company. 
// Always respond in **English** unless explicitly asked to use another language.

// Rules:
// - Use <context> first to answer questions. If not covered, use general IT/business knowledge but clarify it’s beyond the given data.  
// - If the user asks something unrelated, briefly acknowledge and redirect to Sentseven’s IT/business services. 
// - Do NOT include any XML or tags like <context> or <chat_history> in your response.  
// - Keep answers clear and professional.  
// - Keep answers concise and to the point (1–3 sentences or short paragraphs).
// - Provide accurate, relevant info only; avoid unnecessary detail.


// <context>  
//   {context}  
// </context>  

// <chat_history>  
//   {chat_history}  
// </chat_history>  

// Question: {question}
// `;

// const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const messages = body.messages ?? [];
//     const previousMessages = messages.slice(0, -1);
//     const currentMessageContent = messages[messages.length - 1].content;

//     const model = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.2, maxCompletionTokens: 150 });

//     const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PRIVATE_KEY!);

//     const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
//       client,
//       tableName: "documents",
//       queryName: "match_documents",
//     });

//     // Standalone question chain
//     const standaloneQuestionChain = RunnableSequence.from([condenseQuestionPrompt, model, new StringOutputParser()]);

//     let resolveWithDocuments: (value: Document[]) => void;
//     const documentPromise = new Promise<Document[]>((resolve) => {
//       resolveWithDocuments = resolve;
//     });

//     const retriever = vectorstore.asRetriever({
//       callbacks: [{ handleRetrieverEnd(documents) { resolveWithDocuments(documents); } }],
//     });

//     const retrievalChain = retriever.pipe(combineDocumentsFn);

//     const answerChain = RunnableSequence.from([
//       {
//         context: RunnableSequence.from([(input) => input.question, retrievalChain]),
//         chat_history: (input) => input.chat_history,
//         question: (input) => input.question,
//       },
//       answerPrompt,
//       model,
//     ]);

//     const conversationalRetrievalQAChain = RunnableSequence.from([
//       { question: standaloneQuestionChain, chat_history: (input) => input.chat_history },
//       answerChain,
//       new BytesOutputParser(),
//     ]);

//     const stream = await conversationalRetrievalQAChain.stream({
//       question: currentMessageContent,
//       chat_history: formatVercelMessages(previousMessages),
//     });

//     const documents = await documentPromise;

//     // Convert to base64 sources for UI headers
//     const serializedSources = Buffer.from(
//       JSON.stringify(
//         documents.map((doc) => ({ pageContent: doc.pageContent.slice(0, 50) + "...", metadata: doc.metadata }))
//       )
//     ).toString("base64");

//     // Collect final text from stream
//     let botText = "";
//     const reader = stream.getReader();
//     const decoder = new TextDecoder();

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) break;
//       botText += decoder.decode(value);
//     }

//     // Determine if answer was confident
//     const answeredConfidently = documents.length > 0 && !botText.includes("beyond the given data");

//     // Save conversation to Supabase
//     await client.from("conversations").insert([
//       {
//         user_message: currentMessageContent,
//         bot_response: botText,
//         success: answeredConfidently,
//         metadata: { sources: documents.map((d) => d.metadata) },
//       },
//     ]);

//     return new StreamingTextResponse(new ReadableStream({
//       async start(controller) {
//         controller.enqueue(new TextEncoder().encode(botText));
//         controller.close();
//       }
//     }), {
//       headers: {
//         "x-message-index": (previousMessages.length + 1).toString(),
//         "x-sources": serializedSources,
//       },
//     });

//   } catch (e: any) {
//     console.error(e);
//     return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { createClient } from "@supabase/supabase-js";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { RunnableSequence } from "@langchain/core/runnables";
import { BytesOutputParser, StringOutputParser } from "@langchain/core/output_parsers";

export const runtime = "edge";

// Combine document text + source URL (keep it short)
const combineDocumentsFn = (docs: Document[]) =>
  docs
    .map(
      (doc) =>
        `${doc.pageContent.slice(0, 300)}${doc.pageContent.length > 300 ? "..." : ""
        } (Source: ${doc.metadata.url ?? "unknown"})`
    )
    .join("\n\n");

const formatVercelMessages = (chatHistory: VercelChatMessage[]) =>
  chatHistory
    .map((m) =>
      m.role === "user" ? `Human: ${m.content}` : `Assistant: ${m.content}`
    )
    .join("\n");

const CONDENSE_QUESTION_TEMPLATE = `Rephrase the following follow-up question to be standalone.

<chat_history>
{chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;

const ANSWER_TEMPLATE = `You are Sentseven, an AI agent representing an innovative IT solutions company. 
Always respond in **English** unless explicitly asked to use another language.

Rules:
- Use <context> first to answer questions. If not covered, use general IT/business knowledge but clarify it’s beyond the given data.  
- If the user asks something unrelated, briefly acknowledge and redirect to Sentseven’s IT/business services. 
- Do NOT include any XML or tags like <context> or <chat_history> in your response.  
- Keep answers clear and professional.  
- Keep answers concise and to the point (1–3 sentences or short paragraphs).
- Provide accurate, relevant info only; avoid unnecessary detail.
- Include source URLs if relevant.
- If a reference link is relevant to the site, return it as an internal path like "/about", not a full URL clickable link in markdown format, e.g., [About Us](/about).

- If no navigation is needed, omit the "navigate" field.



<context>
{context}
</context>

<chat_history>
{chat_history}
</chat_history>

Question: {question}`;

const condenseQuestionPrompt = PromptTemplate.fromTemplate(CONDENSE_QUESTION_TEMPLATE);
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id: siteId } = params

    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;
    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.2,
      maxCompletionTokens: 100,
    });

    const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "vectors",
      queryName: "match_documents",
    });

    const standaloneQuestionChain = RunnableSequence.from([condenseQuestionPrompt, model, new StringOutputParser()]);

    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retriever = vectorstore.asRetriever({
      callbacks: [{ handleRetrieverEnd(documents) { resolveWithDocuments(documents); } }],
    });

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([(input) => input.question, retrievalChain]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      { question: standaloneQuestionChain, chat_history: (input) => input.chat_history },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: formatVercelMessages(previousMessages),
    });

    const documents = await documentPromise;

    const serializedSources = Buffer.from(
      JSON.stringify(documents.map((doc) => ({
        pageContent: doc.pageContent.slice(0, 50) + "...",
        metadata: doc.metadata
      })))
    ).toString("base64");

    let botText = "";
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      botText += decoder.decode(value);
    }

    const answeredConfidently = documents.length > 0 && !botText.toLowerCase().includes("beyond the given data");

    await client.from("chat_logs").insert([
      {
        site_id: siteId,
        session_id: body.sessionId,
        user_message: currentMessageContent,
        bot_response: botText,
        response_time_ms: 1200,
        tokens_used: 300,
        success: answeredConfidently,
        metadata: { sources: documents.map((d) => d.metadata) },
      },
    ]);



    return new StreamingTextResponse(new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode(botText));
        controller.close();
      }
    }), {
      headers: {
        "x-message-index": (previousMessages.length + 1).toString(),
        "x-sources": serializedSources,
      },
    });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
