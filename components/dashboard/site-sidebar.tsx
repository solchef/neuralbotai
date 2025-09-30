"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import {
    Globe,
    BarChart3,
    MessageSquare,
    Users,
    FileText,
    Settings,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SiteSidebar() {
    const params = useParams()
    const pathname = usePathname()
    const siteId = params.id as string

    // Example list of bots (replace with actual tenant bots data from props or context)
    const bots = [
        { id: "1", name: "Support Bot" },
        { id: "2", name: "Sales Bot" },
        { id: "3", name: "Marketing Bot" },
    ]

    const sections = [
        {
            title: "Activity",
            items: [
                { name: "Overview", href: `/dashboard/sites/${siteId}`, icon: Globe },
                // { name: "Analytics", href: `/dashboard/sites/${siteId}/analytics`, icon: BarChart3 },
                { name: "Chat History", href: `/dashboard/sites/${siteId}/conversations`, icon: MessageSquare },
                // { name: "Leads", href: `/dashboard/sites/${siteId}/leads`, icon: Users },
                // { name: "Live Chat", href: `/dashboard/sites/${siteId}/live-chat`, icon: MessageSquare },
            ],
        },
        {
            title: "Training",
            items: [
                { name: "Links / Docs", href: `/dashboard/sites/${siteId}/training/links`, icon: FileText },
                { name: "Text", href: `/dashboard/sites/${siteId}/training/text`, icon: FileText },
                { name: "Q&A", href: `/dashboard/sites/${siteId}/training/qa`, icon: MessageSquare },
            ],
        },
        {
            title: "Behaviour",
            items: [
                { name: "Tune AI", href: `/dashboard/sites/${siteId}/tune`, icon: Settings },
                { name: "Test Your Bot", href: `/dashboard/sites/${siteId}/test`, icon: MessageSquare },
            ],
        },
        {
            title: "Deployment",
            items: [
                { name: "Appearance", href: `/dashboard/sites/${siteId}/appearance`, icon: Settings },
                { name: "Deploy", href: `/dashboard/sites/${siteId}/deploy`, icon: Globe },
            ],
        },
    ]

    return (
        <aside className="fixed inset-y-0 left-20 z-40 w-64 border-r bg-card/80 backdrop-blur-xl">
            <div className="p-4 border-b">
                <Select defaultValue={siteId}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select bot" />
                    </SelectTrigger>
                    <SelectContent>
                        {bots.map((bot) => (
                            <SelectItem key={bot.id} value={bot.id}>
                                {bot.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon
                                const active = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${active
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}









// "use client"

// import { useParams, usePathname, useRouter } from "next/navigation"
// import Link from "next/link"
// import {
//   Globe,
//   BarChart3,
//   MessageSquare,
//   Users,
//   FileText,
//   Settings,
// } from "lucide-react"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export function SiteSidebar({ bots }: { bots: { id: string; name: string }[] }) {
//   const params = useParams()
//   const pathname = usePathname()
//   const router = useRouter()
//   const siteId = params.id as string

//   const sections = [
//     {
//       title: "Activity",
//       items: [
//         { name: "Overview", href: `/dashboard/sites/${siteId}`, icon: Globe },
//         { name: "Analytics", href: `/dashboard/sites/${siteId}/analytics`, icon: BarChart3 },
//         { name: "Chat History", href: `/dashboard/sites/${siteId}/conversations`, icon: MessageSquare },
//         { name: "Leads", href: `/dashboard/sites/${siteId}/leads`, icon: Users },
//         { name: "Live Chat", href: `/dashboard/sites/${siteId}/live-chat`, icon: MessageSquare },
//       ],
//     },
//     {
//       title: "Training",
//       items: [
//         { name: "Links / Docs", href: `/dashboard/sites/${siteId}/training/links`, icon: FileText },
//         { name: "Text", href: `/dashboard/sites/${siteId}/training/text`, icon: FileText },
//         { name: "Q&A", href: `/dashboard/sites/${siteId}/training/qa`, icon: MessageSquare },
//       ],
//     },
//     {
//       title: "Behaviour",
//       items: [
//         { name: "Tune AI", href: `/dashboard/sites/${siteId}/tune`, icon: Settings },
//         { name: "Test Your Bot", href: `/dashboard/sites/${siteId}/test`, icon: MessageSquare },
//       ],
//     },
//     {
//       title: "Deployment",
//       items: [
//         { name: "Appearance", href: `/dashboard/sites/${siteId}/appearance`, icon: Settings },
//         { name: "Deploy", href: `/dashboard/sites/${siteId}/deploy`, icon: Globe },
//       ],
//     },
//   ]

//   return (
//     <aside className="fixed inset-y-0 left-20 z-40 w-64 border-r bg-card/80 backdrop-blur-xl">
//       {/* Bot Selector */}
//       <div className="p-4 border-b">
//         <Select
//           defaultValue={siteId}
//           onValueChange={(val) => router.push(`/dashboard/sites/${val}`)}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select bot" />
//           </SelectTrigger>
//           <SelectContent>
//             {bots.map((bot) => (
//               <SelectItem key={bot.id} value={bot.id}>
//                 {bot.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Navigation */}
//       <TooltipProvider>
//         <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
//           {sections.map((section) => (
//             <div key={section.title}>
//               <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
//                 {section.title}
//               </h3>
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const Icon = item.icon
//                   const active = pathname === item.href
//                   return (
//                     <Tooltip key={item.name}>
//                       <TooltipTrigger asChild>
//                         <Link
//                           href={item.href}
//                           className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
//                             ${
//                               active
//                                 ? "bg-primary text-primary-foreground"
//                                 : "text-muted-foreground hover:text-foreground hover:bg-muted"
//                             }`}
//                         >
//                           <Icon className="h-4 w-4" />
//                           <span className="truncate">{item.name}</span>
//                         </Link>
//                       </TooltipTrigger>
//                       {collapsed && (
//                         <TooltipContent side="right">{item.name}</TooltipContent>
//                       )}
//                     </Tooltip>
//                   )
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>
//       </TooltipProvider>
//     </aside>
//   )
// }
