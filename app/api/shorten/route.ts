// app/api/shorten/route.ts
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // The '@' alias points to your root now
import { redis, getClientIp, getRateLimit, incrementRateLimit } from "@/lib/redis";

const bodySchema = z.object({
  url: z.string().min(1, "URL is required").url("Invalid URL format"),
  customUrl: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = bodySchema.safeParse(body);
    let shortCode = validation?.data?.customUrl
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 },
      );
    }

    const ip = getClientIp(req)
    const data = await prisma.shortLink.findUnique({ where: { shortCode } })
    if (data) {
      return NextResponse.json(
        { error: "This custom name is already taken" },
        { status: 400 },
      );
    }

    const { count } = await getRateLimit(ip)
    if (count >= 3) {
      return NextResponse.json(
        { error: "You have used all 3 free credits. Watch an ad to reset your usage." },
        { status: 429 },
      );
    }

    if (!shortCode) {
      shortCode = nanoid(6);
    }

    await prisma.shortLink.create({
      data: {
        originalUrl: validation.data.url,
        shortCode,
        creatorIP: ip,
      },
    });

    await redis.set(`short:${shortCode}`, validation.data.url);

    const { count: updatedCount } = await incrementRateLimit(ip)
    const usage = Math.min(updatedCount, 3)

    return NextResponse.json({ shortCode, usage }, { status: 201 });
  } catch (error) {
    console.error("Shorten API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
