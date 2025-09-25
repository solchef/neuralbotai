"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function WidgetPage() {
    const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
        { from: "bot", text: "👨‍💻 Hi there! I’m Sentseven assistant. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);
    const [currentBotMessage, setCurrentBotMessage] = useState(""); // streaming text
    const [dots, setDots] = useState(""); // typing dots animation

    // Dark mode detection
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { from: "user" as const, text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setCurrentBotMessage("👨‍💻"); // initial placeholder
        setDots("");
        scrollToBottom();

        // Typing dots animation
        let dotIndex = 0;
        const dotInterval = setInterval(() => {
            dotIndex = (dotIndex + 1) % 4;
            setDots(".".repeat(dotIndex));
        }, 500);

        try {
            const res = await fetch("/api/chat/retrieval", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
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
            const interval = 25; // speed per character

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

            // Final message added to chat
            setMessages((prev) => [...prev, { from: "bot", text: botText }]);
        } catch (err) {
            setMessages((prev) => [...prev, { from: "bot", text: "❌ Error: Could not get response" }]);
        } finally {
            clearInterval(dotInterval);
            setCurrentBotMessage("");
            setDots("");
        }
    };

    // Update current bot message with dots
    useEffect(() => {
        if (currentBotMessage) {
            setCurrentBotMessage((prev) => prev.replace(/\.*$/, dots));
        }
    }, [dots]);

    return (
        <div
            className={`h-screen w-screen flex flex-col font-sans transition-colors duration-300 ${isDark ? "bg-gradient-to-b from-gray-900 to-black text-white" : "bg-gradient-to-b from-blue-50 to-white text-gray-900"
                }`}
        >
            {/* Header */}
            <div className={`p-4 text-lg font-semibold shadow ${isDark ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}>
                Sentseven
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
                                    // Only use SPA navigation for internal links
                                    if (href?.startsWith("/")) {
                                        return (
                                            <Link href={href} className="text-green-400 underline hover:text-green-600">
                                                {children}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-600">
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

                {/* Streaming bot message with dots */}
                {currentBotMessage && (
                    <div
                        className={`px-4 py-2 rounded-2xl max-w-[75%] break-words ${isDark ? "bg-gray-700 text-gray-100 mr-auto shadow-sm" : "bg-gray-200 text-gray-900 mr-auto shadow-sm"
                            }`}
                    >
                        {currentBotMessage}
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className={`p-3 border-t flex items-center gap-2 shadow-inner ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
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
