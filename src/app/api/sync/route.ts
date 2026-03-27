import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GoogleApiService } from '@/lib/google-api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user's Google account to get refresh token
  const account = await prisma.account.findFirst({
    where: { userId: (session.user as any).id, provider: 'google' },
  });

  if (!account || !account.access_token) {
    return NextResponse.json({ error: 'No Google account connected' }, { status: 400 });
  }

  const googleApi = new GoogleApiService(account.access_token!, account.refresh_token!);
  const sites = await prisma.site.findMany({
    where: { userId: (session.user as any).id },
  });

  const results = [];

  for (const site of sites) {
    try {
      if (site.ga4PropertyId) {
        // Fetch last 30 days
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const data = await googleApi.getGA4Data(site.ga4PropertyId, startDate, endDate);
        
        // Save to Metric table (simplified for MVP)
        // Here we would iterate through data.rows and upsert into Metric table
        results.push({ site: site.domain, status: 'success' });
      }
    } catch (error) {
      console.error(`Error syncing ${site.domain}:`, error);
      results.push({ site: site.domain, status: 'failed', error: (error as any).message });
    }
  }

  return NextResponse.json({ message: 'Sync complete', results });
}
