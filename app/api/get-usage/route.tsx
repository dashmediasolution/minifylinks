import { NextRequest, NextResponse } from 'next/server'
import { getRateLimit } from '@/lib/redis';

export async function GET(request: NextRequest) {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'

    const { count } = await getRateLimit(ip);
    const usage = Math.min(count, 3);

    return NextResponse.json({ usage })
}