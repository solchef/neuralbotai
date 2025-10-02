// src/lib/service/index.ts

export * from "./auth"
export * from "./tenant"
export * from "./site"
export * from "./links"
export * from "./chatbot"
export * from "./text"
export * from "./qa"
export * from "./analytics"
export * from "./usage"
export * from "./invoices"
export * from "./feedback"
export * from "./sessions"

// Compatibility wrapper for existing SupabaseService usage
import * as AuthService from "./auth"
import * as TenantService from "./tenant"
import * as SiteService from "./site"
import * as LinksService from "./links"
import * as ChatbotService from "./chatbot"
import * as TextService from "./text"
import * as QAService from "./qa"
import * as AnalyticsService from "./analytics"
import * as UsageService from "./usage"
import * as InvoicesService from "./invoices"
import * as FeedbackService from "./feedback"
import * as SessionsService from "./sessions"

export const SupabaseService: any = {
    ...AuthService,
    ...TenantService,
    ...SiteService,
    ...LinksService,
    ...ChatbotService,
    ...TextService,
    ...QAService,
    ...AnalyticsService,
    ...UsageService,
    ...InvoicesService,
    ...FeedbackService,
    ...SessionsService,
}

