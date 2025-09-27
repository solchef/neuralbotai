export type ChatbotConfig = {
    siteId: string
    title: string
    titleEnabled: boolean
    welcomeMessage: string
    welcomeEnabled: boolean
    primaryColor: string
    theme: "light" | "dark" | "auto"
    avatar: string
}

export type ChatbotTuning = {
    siteId: string
    botName: string
    botPersonality: string
    systemPrompt: string
    temperature: number
    maxTokens: number
    responseLength: "short" | "medium" | "long"
    language: string
    fallbackEnabled: boolean
    fallbackMessage: string
    confidenceThreshold: number
    contextWindow: number
    enableMemory: boolean
    enableSentiment: boolean
    enableModeration: boolean
    enableAnalytics: boolean
}
