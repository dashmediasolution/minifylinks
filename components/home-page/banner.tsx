"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ImageIcon, PlaneTakeoff } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
interface DynamicBannerItem {
    id: string;
    title: string;
    description?: string;
    image: string;      // The dynamic Cloudinary URL
    redirectTo?: string;   // The dynamic redirect URL
}

export default function Banner() {
    const [banners, setBanners] = useState<DynamicBannerItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch public-facing active banners from your DB route
        async function fetchBanners() {
            try {
                const res = await fetch("/api/admin/banner");
                if (!res.ok) throw new Error("Failed to fetch banners");
                const data = await res.json();
                setBanners(data);
            } catch (error) {
                console.error("Error loading homepage banners:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBanners();
    }, []);

    // 1. Loading State
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center pt-32 pb-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (banners.length === 0) {
        return 
    }

    // 3. Dynamic Carousel View
    return (
        
        <div className="w-full bg-slate-50 pt-10 pb-12 px-4 md:px-8">
            <div className="mx-auto w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">

                <div className="relative z-10 mb-16 text-center sm:mb-20 max-w-2xl mx-auto space-y-4">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-100/50 px-4 py-2 rounded-full">
                        Exclusive Promotions

                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mt-4">
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">Updates.</span>
                    </h2>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: banners.length > 1, // Loop only if there's more than 1 banner
                    }}
                    className="w-full overflow-hidden rounded-3xl shadow-xl"
                >
                    <CarouselContent>
                        {banners.map((slide) => {
                            const contentLayout = (
                                <div className="relative w-full aspect-video md:aspect-26/9 min-h-[350px]">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        priority

                                    />

                                </div>
                            );

                            return (
                                <CarouselItem key={slide.id} className="relative cursor-pointer overflow-hidden bg-slate-900">
                                    {slide.redirectTo ? (
                                        <Link href={slide?.redirectTo} target="_blank"
                                            rel="noopener noreferrer">
                                            {contentLayout}
                                        </Link>
                                    ) : (
                                        contentLayout
                                    )}
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    {/* Only render nav buttons if there are multiple slides */}
                    {banners.length > 1 && (
                        <div className="hidden sm:block">
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur text-slate-800 border-0 z-30" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur text-slate-800 border-0 z-30" />
                        </div>
                    )}
                </Carousel>
            </div>
        </div>
    );
}