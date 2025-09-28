

// import { create } from "zustand";
// import { SupabaseService } from "@/lib/supabase/service";

// interface Conversation {
//     session_id: string;
//     site_id: string;
//     role: string;
//     content: string;
//     created_at: string;
// }

// interface ChatStore {
//     siteConversations: Conversation[];
//     sessionMessages: Conversation[];
//     loading: boolean;
//     fetchSiteConversations: (siteId: string) => Promise<void>;
//     fetchSessionMessages: (sessionId: string) => Promise<void>;
// }

// export const useChatStore = create<ChatStore>((set) => ({
//     siteConversations: [],
//     sessionMessages: [],
//     loading: false,

//     fetchSiteConversations: async (siteId) => {
//         set({ loading: true });
//         const data = await SupabaseService.fetchSiteChatLogs(siteId);
//         set({ siteConversations: data, loading: false });
//     },

//     fetchSessionMessages: async (sessionId) => {
//         set({ loading: true });
//         const data = await SupabaseService.fetchSessionChatLogs(sessionId);
//         set({ sessionMessages: data, loading: false });
//     },
// }));


import { create } from "zustand";
import { SupabaseService } from "@/lib/supabase/service";

interface ChatMessage {
    id: string;
    sender: "user" | "bot";
    content: string;
    timestamp: string;
}

interface ConversationPreview {
    sessionId: string;
    siteId: string;
    lastMessage: string;
    timestamp: string;
}

interface ChatStore {
    siteConversations: ConversationPreview[];
    sessionMessages: ChatMessage[];
    loading: boolean;
    fetchSiteConversations: (siteId: string) => Promise<void>;
    fetchSessionMessages: (sessionId: string) => Promise<void>;
    clearSessionMessages: () => void;
}

/**
 * Expand logs into user/bot messages
 */
function transformLogsToMessages(logs: any[]): ChatMessage[] {
    const messages: ChatMessage[] = [];

    logs.forEach((log) => {
        if (log.user_message) {
            messages.push({
                id: `${log.id}-user`,
                sender: "user",
                content: log.user_message,
                timestamp: log.created_at,
            });
        }
        if (log.bot_response) {
            messages.push({
                id: `${log.id}-bot`,
                sender: "bot",
                content: log.bot_response,
                timestamp: log.created_at,
            });
        }
    });

    return messages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}

/**
 * Collapse logs into conversation previews
 * (useful for showing site-wide conversation list)
 */
function transformLogsToConversations(logs: any[]): ConversationPreview[] {
    const sessionsMap: Record<string, ConversationPreview> = {};

    logs.forEach((log) => {
        const sessionId = log.session_id;
        const lastContent = log.bot_response || log.user_message;

        if (!sessionsMap[sessionId] || new Date(log.created_at) > new Date(sessionsMap[sessionId].timestamp)) {
            sessionsMap[sessionId] = {
                sessionId,
                siteId: log.site_id,
                lastMessage: lastContent,
                timestamp: log.created_at,
            };
        }
    });

    // sort newest first
    return Object.values(sessionsMap).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

export const useChatStore = create<ChatStore>((set) => ({
    siteConversations: [],
    sessionMessages: [],
    loading: false,

    fetchSiteConversations: async (siteId) => {
        set({ loading: true });
        try {
            const logs = await SupabaseService.fetchSiteChatLogs(siteId);
            const convos = transformLogsToConversations(logs);
            set({ siteConversations: convos });
        } finally {
            set({ loading: false });
        }
    },

    fetchSessionMessages: async (sessionId) => {
        set({ loading: true });
        try {
            const logs = await SupabaseService.fetchSessionChatLogs(sessionId);
            const messages = transformLogsToMessages(logs);
            set({ sessionMessages: messages });
        } finally {
            set({ loading: false });
        }
    },

    clearSessionMessages: () => set({ sessionMessages: [] }),
}));
