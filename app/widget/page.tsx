"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useChatStore } from "@/store/useChatStore";

export default function WidgetPage() {
    const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
        { from: "bot", text: "👨‍💻 Hi there! I’m Sentseven assistant. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);
    const [currentBotMessage, setCurrentBotMessage] = useState("");
    const [dots, setDots] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { logMessage } = useChatStore()

    // Dark mode detection
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("#sentseven-menu")) setMenuOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const clearChat = () => {
        setMessages([]);
        setCurrentBotMessage("");
    };

    const exportChat = () => {
        const text = messages
            .map((m) => `${m.from === "user" ? "You" : "Bot"}: ${m.text}`)
            .join("\n\n");

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "chat-export.txt";
        link.click();
        URL.revokeObjectURL(url);
    };

    function getOrCreateSessionId(): string {
        const SESSION_TIMEOUT_MINUTES = 30;
        const now = Date.now();

        const stored = localStorage.getItem("neural-bot-session");
        if (stored) {
            const { sessionId, createdAt } = JSON.parse(stored);
            const ageMinutes = (now - createdAt) / 1000 / 60;

            if (ageMinutes < SESSION_TIMEOUT_MINUTES) {
                return sessionId; // still valid
            }
        }

        // expired or not found → create new session
        const newSessionId = crypto.randomUUID();
        localStorage.setItem(
            "neural-bot-session",
            JSON.stringify({ sessionId: newSessionId, createdAt: now })
        );
        return newSessionId;
    }


    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { from: "user" as const, text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setCurrentBotMessage("👨‍💻");
        setDots("");
        scrollToBottom();

        let dotIndex = 0;
        const dotInterval = setInterval(() => {
            dotIndex = (dotIndex + 1) % 4;
            setDots(".".repeat(dotIndex));
        }, 500);


        try {
            // Retrieve siteId and token from script tag
            const siteId = new URLSearchParams(window.location.search).get("site-id");
            const token = new URLSearchParams(window.location.search).get("token");

            // console.log(siteId, token)

            if (!siteId || !token) throw new Error("Missing siteId or token in <script>");

            // 🔹 always resolve session with expiry check
            const sessionId = getOrCreateSessionId();
            // console.log(siteId, token, sessionId);
            const res = await fetch(`/api/sites/${siteId}/chat/retrieval`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.from === "user" ? "user" : "assistant",
                        content: m.text,
                    })),
                }),
            });

            if (!res.body) throw new Error("No response from server");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let botText = "";
            const interval = 25;

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);

                for (const char of chunk) {
                    botText += char;
                    setCurrentBotMessage("👨‍💻 " + botText + dots);
                    scrollToBottom();
                    await new Promise((r) => setTimeout(r, interval));
                }
            }

            setMessages((prev) => [...prev, { from: "bot", text: botText }]);
        } catch {
            setMessages((prev) => [...prev, { from: "bot", text: "❌ Error: Could not get response" }]);
        } finally {
            clearInterval(dotInterval);
            setCurrentBotMessage("");
            setDots("");
        }
    };

    return (
        <div
            className={`h-screen w-screen flex flex-col font-sans transition-colors duration-300 ${isDark
                ? "bg-gradient-to-b from-gray-900 to-black text-white"
                : "bg-gradient-to-b from-blue-50 to-white text-gray-900"
                }`}
        >
            {/* Header */}
            <div
                className={`p-4 text-lg font-semibold shadow flex justify-between items-center ${isDark ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                        AI
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Sentseven Assistant</p>
                        <p className="text-xs opacity-80">Online</p>
                    </div>
                </div>
                <div id="sentseven-menu" className="flex items-center gap-2 relative">
                    {/* 3-dots menu button */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="p-1 rounded hover:bg-white/10"
                    >
                        ⋮
                    </button>

                    {/* Dropdown */}
                    {menuOpen && (
                        <div
                            className={`absolute right-10 top-10 w-32 rounded-md shadow-lg z-50 ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                                }`}
                        >
                            <button
                                onClick={() => {
                                    clearChat();
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Clear Chat
                            </button>
                            <button
                                onClick={() => {
                                    exportChat();
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Export Chat
                            </button>
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        onClick={() => window.parent.postMessage({ type: "CLOSE_WIDGET" }, "*")}
                        className="p-1 rounded hover:bg-white/10"
                    >
                        ✕
                    </button>
                </div>
            </div>


            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`px-4 py-2 rounded-2xl max-w-[75%] break-words ${msg.from === "user"
                            ? isDark
                                ? "bg-blue-500 text-white ml-auto shadow-md"
                                : "bg-blue-600 text-white ml-auto shadow-md"
                            : isDark
                                ? "bg-gray-700 text-gray-100 mr-auto shadow-sm"
                                : "bg-gray-200 text-gray-900 mr-auto shadow-sm"
                            }`}
                    >
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => {
                                    if (href?.startsWith("/")) {
                                        return (
                                            <Link
                                                href={href}
                                                className="text-green-400 underline hover:text-green-600"
                                            >
                                                {children}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline hover:text-blue-600"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                ))}

                {/* Streaming bot message */}
                {currentBotMessage && (
                    <div
                        className={`px-4 py-2 rounded-2xl max-w-[75%] break-words ${isDark
                            ? "bg-gray-700 text-gray-100 mr-auto shadow-sm"
                            : "bg-gray-200 text-gray-900 mr-auto shadow-sm"
                            }`}
                    >
                        {currentBotMessage}
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div
                className={`p-3 border-t flex items-center gap-2 shadow-inner ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
            >
                <input
                    className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 ${isDark
                        ? "bg-gray-700 text-white border border-gray-600 focus:ring-blue-400"
                        : "bg-white text-gray-900 border focus:ring-blue-500"
                        }`}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
