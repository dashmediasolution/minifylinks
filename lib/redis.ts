import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export function normalizeIp(ip?: string | null) {
  if (!ip) return '127.0.0.1'

  const firstValue = ip.split(',')[0]?.trim()
  return firstValue || '127.0.0.1'
}

export function getClientIp(request: { headers: Headers | { get(name: string): string | null } }) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const normalized = normalizeIp(forwardedFor)
    if (normalized && normalized !== '127.0.0.1') {
      return normalized
    }
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    const normalized = normalizeIp(realIp)
    if (normalized) return normalized
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    const normalized = normalizeIp(cfConnectingIp)
    if (normalized) return normalized
  }

  return '127.0.0.1'
}

export async function getRateLimit(ip: string) {
  const key = `rate:${ip}`
  const count = await redis.get<number>(key)
  const ttl = await redis.ttl(key)

  return {
    count: count ?? 0,
    ttl: ttl > 0 ? ttl : 86400,
  }
}

export async function incrementRateLimit(ip: string) {
  const key = `rate:${ip}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 86400)
  }

  const ttl = await redis.ttl(key)

  return {
    count,
    ttl: ttl > 0 ? ttl : 86400,
  }
}

export async function checkRateLimit(ip: string) {
  return incrementRateLimit(ip)
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