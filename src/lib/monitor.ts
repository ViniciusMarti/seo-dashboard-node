import axios from 'axios';
import { prisma } from './prisma';

export async function checkSiteHealth(siteId: string, url: string) {
  const start = Date.now();
  try {
    const response = await axios.get(`https://${url}`, { timeout: 10000 });
    const responseTime = Date.now() - start;
    
    await prisma.healthCheck.create({
      data: {
        siteId,
        status: response.status,
        responseTime,
        isUp: response.status === 200,
      },
    });
    
    return { isUp: response.status === 200, responseTime };
  } catch (error) {
    const responseTime = Date.now() - start;
    await prisma.healthCheck.create({
      data: {
        siteId,
        status: (error as any).response?.status || 0,
        responseTime,
        isUp: false,
      },
    });
    return { isUp: false, responseTime };
  }
}
