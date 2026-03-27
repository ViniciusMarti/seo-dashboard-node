import { 
  Users, 
  MousePointer2, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SITES } from "@/config/sites"

export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "128,432", change: "+12.5%", trendingUp: true, icon: Users },
    { label: "Organic Clicks", value: "45,210", change: "+8.2%", trendingUp: true, icon: MousePointer2 },
    { label: "Impressions", value: "1.2M", change: "-2.4%", trendingUp: false, icon: Eye },
    { label: "Avg. Position", value: "12.4", change: "+0.5", trendingUp: true, icon: Target },
  ]

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-zinc-400 mt-1">Global performance across {SITES.length} sites</p>
        </div>
        <div className="bg-[#27272a] px-4 py-2 rounded-lg border border-[#3f3f46] text-sm font-medium">
          Last 28 Days vs Previous
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-zinc-400">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1 text-xs font-medium">
                {stat.trendingUp ? (
                  <span className="flex items-center text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="flex items-center text-rose-500">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                )}
                <span className="text-zinc-500 ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass border-none shadow-xl min-h-[400px]">
          <CardHeader>
            <CardTitle>Traffic Analysis</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-zinc-500 h-[300px]">
            {/* Chart will go here */}
            <TrendingUp className="h-12 w-12 opacity-20" />
            <p className="ml-4">Aggregate traffic trends visualization</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 glass border-none shadow-xl">
          <CardHeader>
            <CardTitle>Top Performing Sites</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
               {SITES.slice(0, 5).map((site, i) => (
                 <div key={site.domain} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                       0{i + 1}
                     </div>
                     <div>
                       <div className="text-sm font-medium">{site.name}</div>
                       <div className="text-xs text-zinc-500">{site.domain}</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-sm font-bold">12,430</div>
                     <div className="text-[10px] text-emerald-500">+14%</div>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
