import { ChatbotConfig, ChatbotTuning } from "@/lib/types/chatBotConfig";


export const DEFAULT_CHATBOT_CONFIG: ChatbotConfig = {
    siteId: "",
    title: "Neural.ai Assistant",
    titleEnabled: true,
    welcomeMessage: "Hi, How can I help you today?",
    welcomeEnabled: true,
    primaryColor: "#10b981",
    theme: "light",
    avatar: "default",
}

export const DEFAULT_TUNING_CONFIG: ChatbotTuning = {
    siteId: "",
    botName: "Neural Assistant",
    botPersonality: "professional",
    systemPrompt:
        "You are a helpful AI assistant for Neural.ai. Be professional, friendly, and concise in your responses. Always try to help users with their questions about our platform and services.",
    temperature: 0.7,
    maxTokens: 150,
    responseLength: "medium",
    language: "en",
    fallbackEnabled: true,
    fallbackMessage:
        "I'm sorry, I don't have enough information to answer that question. Would you like to speak with a human agent?",
    confidenceThreshold: 0.6,
    contextWindow: 5,
    enableMemory: true,
    enableSentiment: false,
    enableModeration: true,
    enableAnalytics: true,
}