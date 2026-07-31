import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function checkRateLimit(ip: string) {
  const key = `rate:${ip}`
  const count = await redis.incr(key)
  
  if (count === 1) {
    await redis.expire(key, 86400)
  }
  const ttl = await redis.ttl(key)
 return {
    count,
    ttl: ttl > 0 ? ttl : 86400 // Default to 86400 if TTL fetch races
  }
}
export function formatTTLHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.ceil((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}
// Reset rate limit for a specific IP address
export async function resetRateLimit(ip: string) {
  const key = `rate:${ip}`
  return await redis.del(key)
}