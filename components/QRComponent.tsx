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

export   function QRPlatformSection() {
    return (
        <main className="w-full overflow-hidden bg-white">



            <section className="mx-auto max-w-6xl px-6 py-20">

                {/* Feature 01 */}
                <div className="grid items-center gap-12 md:grid-cols-2">

                    {/* Text */}
                    <div className="order-2 md:order-1">

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-100 bg-purple-50">
                                <QrCode className="h-4 w-4 text-purple-600" />
                            </div>

                            <span className="text-xs font-bold text-orange-500">
                                01
                            </span>
                        </div>

                        <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900">
                            Use your QR Codes to demand attention and inspire instant action
                        </h2>

                        <div className="mt-6 space-y-3">
                            {[
                                "Create dynamic QR Codes that you can update anytime",
                                "Add logos, colors, and branding to match your identity",
                                "Boost engagement across print, digital & offline",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-slate-600"
                                >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Dashboard */}
                    <Image
                        src="/images/QRImage.png"
                        alt="QR Code"
                        width={500}
                        height={300}
                        className="order-1 md:order-2 border shadow-md rounded-xl p-4 "
                    />


                </div>


                {/* Feature 02 */}
                <div className="mt-24 grid items-center gap-12 md:grid-cols-2">

                    <Image
                        src="/images/QRCodeImage.png"
                        alt="QR Code"
                        width={400}
                        height={400}
                        className="  border shadow-md rounded-xl p-4 "
                    />

                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                                <BarChart3 className="h-4 w-4 text-orange-500" />
                            </div>

                            <span className="text-xs font-bold text-orange-500">
                                02
                            </span>
                        </div>

                        <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900">
                            Learn how your audience interacts with every QR Code
                        </h2>

                        <div className="mt-6 space-y-3">
                            {[
                                "Real-time scan analytics and performance insights",
                                "Track by location, device, time and platform",
                                "Make data-driven decisions that drive results",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-slate-600"
                                >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


                {/* Feature 03 */}
                <div className="mt-24 grid items-center gap-12 md:grid-cols-2">

                    <div className="order-2 md:order-1">

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-100 bg-purple-50">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                            </div>

                            <span className="text-xs font-bold text-orange-500">
                                03
                            </span>
                        </div>

                        <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900">
                            Build unforgettable brand connections in a single unified platform
                        </h2>

                        <div className="mt-6 space-y-3">
                            {[
                                "Manage all your QR Codes, links & campaigns in one place",
                                "Team collaboration with roles and permissions",
                                "Powerful APIs and integrations to scale your workflow",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-slate-600"
                                >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                   
                    <Image
                        src="/images/UrlShortImage.png"
                        alt="URL Short"
                        width={500}
                        height={500}
                        className="order-1 md:order-2 border shadow-md rounded-xl p-4 "
                    />

                </div>

            </section>


            {/* ===================================================== */}
            {/* PLATFORM FEATURES */}
            {/* ===================================================== */}

            <section className="mx-auto max-w-6xl px-6 pb-20">

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                        The Linkora Platform
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Everything you need to create, manage and optimize QR experiences.
                    </p>
                </div>


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <PlatformCard
                        icon={<Link2 />}
                        title="URL Shortener"
                        description="Create clean, reliable short links in seconds."
                        color="blue"
                    />

                    <PlatformCard
                        icon={<Sparkles />}
                        title="Custom URL Alias"
                        description="Personalize your links with branded custom slugs."
                        color="purple"
                    />

                    <PlatformCard
                        icon={<QrCode />}
                        title="Dynamic QR Code Studio"
                        description="Design custom QR codes with patterns, colors & logos."
                        color="emerald"
                    />

                    <PlatformCard
                        icon={<ScanQrCode />}
                        title="Instant Standard QR"
                        description="Generate clean, scannable QR codes automatically for any link."
                        color="orange"
                    />

                </div>

            </section>


            {/* ===================================================== */}
            {/* TESTIMONIAL SECTION */}
            {/* ===================================================== */}

            <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-orange-400 px-6 py-20">

                {/* Decorative circles */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-white/10" />
                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[40px] border-white/10" />

                <div className="relative mx-auto max-w-6xl">

                    <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">

                        {/* Heading */}
                        <div className="text-white">

                            <div className="mb-4 text-4xl font-bold">
                                “
                            </div>

                            <h2 className="max-w-xs text-3xl font-bold leading-tight">
                                What our customers are saying
                            </h2>

                            {/* Navigation */}
                            <div className="mt-8 flex gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="rounded-full border-white/40 bg-transparent text-white hover:bg-white hover:text-orange-500"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="rounded-full border-white/40 bg-transparent text-white hover:bg-white hover:text-orange-500"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>

                        </div>


                        {/* Testimonial */}
                        <Card className="border-0 bg-white shadow-2xl">

                            <CardContent className="p-8">

                                <div className="flex gap-5">

                                    {/* Avatar */}
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-lg font-bold text-white">
                                        JW
                                    </div>

                                    <div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            Linkora has completely transformed the way we use QR
                                            Codes. The analytics and customization help us deliver
                                            better experiences to our audience every day.
                                        </p>

                                        <div className="mt-5">
                                            <p className="text-sm font-bold text-slate-900">
                                                Jenny Wilson
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Marketing Manager, Acme Inc.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </section>

        </main>
    );
}




function DashboardMockup({
    type,
    className = "",
}: {
    type: "qr" | "analytics" | "platform";
    className?: string;
}) {
    return (
        <div
            className={`relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-purple-50 p-5 shadow-sm ${className}`}
        >

            {/* Fake browser */}
            <div className="h-full rounded-xl border border-slate-200 bg-white p-4 shadow-lg">

                {/* Browser top */}
                <div className="mb-5 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-300" />
                    <div className="h-2 w-2 rounded-full bg-yellow-300" />
                    <div className="h-2 w-2 rounded-full bg-green-300" />

                    <div className="ml-4 h-5 flex-1 rounded bg-slate-50" />
                </div>


                {type === "qr" && (
                    <div className="grid h-[190px] grid-cols-[120px_1fr] gap-4">

                        {/* QR */}
                        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50">
                            <div className="grid grid-cols-5 gap-1 rounded-lg border-4 border-green-500 bg-white p-3">
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 w-2 ${i % 3 !== 0 ? "bg-slate-900" : "bg-white"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="mt-3 h-5 w-16 rounded bg-blue-600" />
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                            <div className="h-5 w-24 rounded bg-slate-100" />

                            <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-8 rounded-md border border-slate-100 bg-slate-50"
                                    />
                                ))}
                            </div>

                            <div className="h-20 rounded-lg bg-purple-50" />
                        </div>

                    </div>
                )}


                {type === "analytics" && (
                    <div className="grid grid-cols-[1fr_100px] gap-5">

                        <div>
                            <div className="mb-5 h-5 w-28 rounded bg-slate-100" />

                            <div className="flex h-36 items-end gap-2">
                                {[30, 50, 35, 70, 45, 85, 60, 100].map(
                                    (height, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t bg-blue-500/70"
                                            style={{ height: `${height}%` }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[14px] border-cyan-400">
                                <span className="text-lg font-bold text-slate-800">
                                    71%
                                </span>
                            </div>
                        </div>

                    </div>
                )}


                {type === "platform" && (
                    <div className="flex gap-4">

                        {/* Sidebar */}
                        <div className="w-10 space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="h-7 rounded bg-slate-50"
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="mb-5 h-6 w-32 rounded bg-slate-100" />

                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-20 rounded-lg bg-blue-50"
                                    />
                                ))}
                            </div>

                            <div className="mt-4 h-20 rounded-lg bg-slate-50" />
                        </div>

                    </div>
                )}

            </div>

        </div>
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