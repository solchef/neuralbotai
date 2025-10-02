export type PlanLimits = {
    id: string
    max_messages: number
    max_sites: number
    max_team_members: number
}

export type TenantWithPlan = {
    plan_id: string
    plans: PlanLimits | null
}