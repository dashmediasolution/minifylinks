// app/api/reset-limit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getClientIp, normalizeIp, resetRateLimit } from "@/lib/redis";
import { z } from "zod";

const resetSchema = z.object({
  ip: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const validation = resetSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Determine target IP: use provided IP, fallback to request IP
    const targetIp = normalizeIp(validation.data?.ip ?? getClientIp(req));

    await resetRateLimit(targetIp);

    return NextResponse.json(
      { message: `Rate limit successfully reset.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Rate Limit API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}