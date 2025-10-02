import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Top row: 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-4"
                    >
                        <Skeleton className="h-6 w-[120px]" />
                        <Skeleton className="h-8 w-[80px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                ))}
            </div>

            {/* Large card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
        </div>
    )
}
