// app/api/shorten/route.ts
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // The '@' alias points to your root now
import { redis, checkRateLimit, formatTTLHours } from "@/lib/redis";

const bodySchema = z.object({
  url: z.string().min(1, "URL is required").url("Invalid URL format"),
  customUrl: z.string()
});

export async function POST(req: NextRequest) {
  try {
    let usage=0;
    const body = await req.json();
    const validation = bodySchema.safeParse(body);
    let shortCode = validation?.data?.customUrl
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 },
      );
    }

    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // --- NEW CHANGE START ---
    // Only enforce limits if we are NOT in development mode
    if (process.env.NODE_ENV !== "development") {
      const { count, ttl } = await checkRateLimit(ip)
      usage=count
      const timeRemaining = formatTTLHours(ttl)
      if (count > 3) {
        return NextResponse.json(
          { error: `Daily limit  reached. Please try again after ${timeRemaining} hours.` },
          { status: 429 },
        );
      }
    }
    // --- NEW CHANGE END ---
    const data = await prisma.shortLink.findUnique({ where: { shortCode } })
    if (data) {
      return NextResponse.json(
        { error: "This custom name is already taken" },
        { status: 400 },
      );
    }
    // 2. Generate Code
    if (!shortCode) {

      shortCode = nanoid(6);
    }

    // 3. Save to MongoDB
    await prisma.shortLink.create({
      data: {
        originalUrl: validation.data.url,
        shortCode,
        creatorIP: ip,
      },
    });
    console.log(usage, "usage")
    // 4. Save to Redis
    await redis.set(`short:${shortCode}`, validation.data.url);

    return NextResponse.json({ shortCode, usage }, { status: 201 });
  } catch (error) {
    console.error("Shorten API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
