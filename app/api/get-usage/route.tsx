import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/redis';
export async function GET(request: NextRequest) {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'
    let usage;
    const {count} = await checkRateLimit(ip);
    if (count > 3) {
         usage = 3
    } 
    return NextResponse.json({
        usage
    })
}