import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, getRateLimit } from '@/lib/redis';

export async function GET(request: NextRequest) {
    const ip = getClientIp(request)

    const { count } = await getRateLimit(ip);
    const usage = Math.min(count, 3);

    return NextResponse.json({ usage })
}