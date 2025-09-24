type Plan = {
    id: string
    name: string
    monthly_queries: number
    max_sites: number
    max_team_members: number
}

type Tenant = {
    id: string
    name: string
    owner_user_id: string
    plans: Plan
}

export type Membership = {
    tenant_id: string
    role: string
    tenants: Tenant
}
