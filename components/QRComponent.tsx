"use client";

import {
    BarChart3,
    Check,
    ChevronLeft,
    ChevronRight,
    Code2,
    ExternalLink,
    FileImage,
    Link2,
    Palette,
    QrCode,
    ScanQrCode,
    Sparkles,
    Zap,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QRPlatformSection({ props, cards }: any) {
        return (
        <main className="w-full overflow-hidden bg-white">



            <section className="mx-auto max-w-6xl flex flex-col px-6 py-20 gap-24">
                {props.map((item: any, index: any) => {

                    const isImageRight = index % 2 === 0;

                    return (
                        <div className="grid items-center gap-12 md:grid-cols-2" key={item.title}>

                            {/* Text */}
                            <div className={`order-2 ${isImageRight ? "md:order-1" : "md:order-2"}`}>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-100 bg-purple-50">
                                        {item?.icon}
                                    </div>

                                    <span className="text-xs font-bold text-orange-500">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900">
                                    {item?.title}
                                </h2>

                                <div className="mt-6 space-y-3">
                                    {item?.points?.map((point: string) => (
                                        <div
                                            key={point}
                                            className="flex items-start gap-2 text-sm text-slate-600"
                                        >
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dashboard / Image */}
                            <Image
                                src={item?.image}
                                alt={item?.title || "Feature Image"}
                                width={500}
                                height={300}
                                // Changed object-cover to object-contain so nothing gets cut off
                                className={`order-1 mx-auto border shadow-md rounded-xl p-4 w-full h-auto max-w-125 aspect-5/4 object-contain bg-white ${isImageRight ? "md:order-2" : "md:order-1"
                                    }`}
                            />
                        </div>
                    );
                })}
            </section>

            {/* ===================================================== */}
            {/* PLATFORM FEATURES */}
            {/* ===================================================== */}

            <section className="mx-auto max-w-6xl px-6 pb-20">

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {cards?.heading}

                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {cards?.subheading}
                    </p>
                </div>


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                 
                    {
                        cards?.items?.map((item:any) => (
                            <PlatformCard
                                key={item?.title}
                                icon={item?.icon}
                                title={item?.title}
                                description={item?.text}
                                color="purple"
                            />
                        ))

                    }
               

                </div>

            </section>


            

        </main>
    );
}




 


function PlatformCard({
    icon,
    title,
    description,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}) {
    return (
        <Card className="group border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <CardContent className="p-5">

                <div
                    className={`mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-${color}-50`}
                >
                    <div className={`h-5 w-5 text-${color}-500`}>
                        {icon}
                    </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                    {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                    {description}
                </p>

                {/* Decorative area */}

            </CardContent>

        </Card>
    );
}