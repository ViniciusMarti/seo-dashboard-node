"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Globe, 
  Search, 
  Settings, 
  BarChart3, 
  AlertCircle,
  LogOut
} from "lucide-react"
import { SITES } from "@/config/sites"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "SEO Deep Dive",
      icon: Search,
      href: "/seo",
      active: pathname === "/seo",
    },
    {
      label: "Health Check",
      icon: AlertCircle,
      href: "/health",
      active: pathname === "/health",
    },
  ]

  return (
    <div className="flex bg-[#09090b] h-full w-72 flex-col border-r border-[#27272a] text-white">
      <div className="flex h-16 items-center px-6 border-b border-[#27272a]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SEO Dash</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#27272a] group",
                route.active ? "bg-[#27272a] text-blue-500" : "text-zinc-400"
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-blue-500" : "text-zinc-400 group-hover:text-white")} />
              <span className="font-medium">{route.label}</span>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Your Sites
          </h3>
          <div className="space-y-1">
            {SITES.map((site) => (
              <Link
                key={site.domain}
                href={`/site/${site.domain}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-[#27272a] transition-all group",
                  pathname.includes(site.domain) ? "bg-[#27272a] text-blue-500" : ""
                )}
              >
                <Globe className="h-4 w-4 shrink-0 transition-colors group-hover:text-white" />
                <span className="truncate">{site.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-[#27272a]">
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-all font-medium">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
