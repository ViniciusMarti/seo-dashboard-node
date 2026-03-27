import { prisma } from "@/lib/prisma"
import { SITES } from "@/config/sites"
import { notFound } from "next/navigation"
import { 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  Target, 
  Search,
  ArrowLeft,
  Settings
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function SiteDetailPage({ params }: { params: { domain: string } }) {
  const site = SITES.find(s => s.domain === params.domain)
  
  if (!site) {
    notFound()
  }

  // Aggregate stats (Mock for MVP)
  const stats = [
    { label: "Active Users", value: "8,432", change: "+12.5%", trendingUp: true, icon: TrendingUp },
    { label: "Organic Clicks", value: "2,210", change: "+8.2%", trendingUp: true, icon: MousePointer2 },
    { label: "Impressions", value: "125K", change: "-2.4%", trendingUp: false, icon: Eye },
    { label: "Avg. Position", value: "8.4", change: "+0.5", trendingUp: true, icon: Target },
  ]

  const topQueries = [
    { query: "consulta cnpj", clicks: 1240, impressions: 5600, ctr: "22.1%", position: 1.2 },
    { query: "gerador de orcamento", clicks: 850, impressions: 4200, ctr: "20.2%", position: 2.4 },
    { query: "van escolar curitiba", clicks: 560, impressions: 3100, ctr: "18.1%", position: 3.1 },
    { query: "teatro infantil sp", clicks: 430, impressions: 2800, ctr: "15.4%", position: 4.5 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Online</Badge>
            </div>
            <p className="text-zinc-500">{site.domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">Sync Now</button>
           <button className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all"><Settings className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-zinc-400">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs mt-1 ${stat.trendingUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change} vs last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-zinc-900 border-zinc-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="seo">SEO Insights</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card className="glass border-none min-h-[400px]">
             <CardHeader>
               <CardTitle>Performance Trend</CardTitle>
             </CardHeader>
             <CardContent className="h-[300px] flex items-center justify-center text-zinc-600">
                <TrendingUp className="h-12 w-12 opacity-10" />
                <p className="ml-4">Traffic analytics chart visualization</p>
             </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo">
          <div className="grid gap-6 lg:grid-cols-3">
             <Card className="lg:col-span-2 glass border-none">
                <CardHeader>
                  <CardTitle>Top Search Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="border-zinc-800">
                      <TableRow>
                        <TableHead>Query</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Impressions</TableHead>
                        <TableHead>CTR</TableHead>
                        <TableHead>Position</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topQueries.map((q) => (
                        <TableRow key={q.query} className="border-zinc-800 hover:bg-zinc-800/30">
                          <TableCell className="font-medium">{q.query}</TableCell>
                          <TableCell>{q.clicks}</TableCell>
                          <TableCell>{q.impressions}</TableCell>
                          <TableCell>{q.ctr}</TableCell>
                          <TableCell>{q.position}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
             </Card>
             <Card className="glass border-none">
                <CardHeader>
                  <CardTitle>SEO Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="text-sm font-bold text-blue-400">High Impressions, Low CTR</div>
                      <p className="text-xs text-zinc-400 mt-1">"gerador de cnpj" has 15k impressions but only 1.2% CTR. Consider optimizing the title tag.</p>
                   </div>
                   <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="text-sm font-bold text-amber-400">Falling Position</div>
                      <p className="text-xs text-zinc-400 mt-1">"consulta mei" fell from #3 to #8. Review page content freshness.</p>
                   </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>
        <TabsContent value="content">
           <div className="text-center py-20 text-zinc-500 glass rounded-xl">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Content analysis coming soon</p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
