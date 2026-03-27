import Redis from 'ioredis';

const globalForRedis = global as unknown as { redis: Redis }

export const redis =
  globalForRedis.redis ||
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export async function getCachedData<T>(key: string): Promise<T | null> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }
  return null;
}

export async function setCachedData(key: string, data: any, ttl: number = 3600): Promise<void> {
  await redis.set(key, JSON.stringify(data), 'EX', ttl);
}
