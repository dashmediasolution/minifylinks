'use client'
import YouTube, { YouTubeProps } from 'react-youtube';
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Link2, ShieldCheck, BarChart3, Loader2 } from 'lucide-react';
import { FileImage } from "lucide-react";
import { videoOptions } from "./generateQRcode";
import { toast } from 'sonner';
import { useGlobalVariable } from '@/context/usageContext';
interface UrlShortnerProps {
    url: string;
    setUrl: (value: string) => void;
    customUrl: string;
    setCustomUrl: (value: string) => void;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    credit: number,
    setCredit: (value: number) => void;
}

export default function UrlShortner({
    url,
    setUrl,
    customUrl,
    setCustomUrl,
    loading,
    handleSubmit,
    credit, setCredit = () => { },
}: UrlShortnerProps) {
    const [showModal, setShowModal] = useState(false);
    const [watchTime, setWatchTime] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    const playerRef = useRef<any>(null);
    const REQUIRED_WATCH_SECONDS = 30;
    const {myVariable ,setMyVariable} = useGlobalVariable()
    // Track playback time when modal opens and video plays
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (showModal && !canClaim) {
            interval = setInterval(() => {
                if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                    const currentTime = Math.floor(playerRef.current.getCurrentTime());
                    setWatchTime(currentTime);

                    if (currentTime >= REQUIRED_WATCH_SECONDS) {
                        setCanClaim(true);
                        clearInterval(interval);
                    }
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showModal, canClaim]);

    // Reset modal state when modal closes
    const handleCloseModal = () => {
        setShowModal(false);
        setWatchTime(0);
        setCanClaim(false);
        playerRef.current = null;
    };
    const handleReset = async () => {
        //   setLoading(true);
        try {
            const res = await fetch("/api/reset-limit", { method: "POST" });
            if (!res.ok) throw new Error();
            if (typeof window !== 'undefined') {
                localStorage.removeItem("credit");
            }
            setCredit(0);
            setMyVariable(myVariable)
            toast.success("Daily limit reset successfully!");
            handleCloseModal();
        } catch {
            toast.error("Failed to reset limit.");
        } finally {
            // setLoading(false);
        }
    };


//     useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedCredit = localStorage.getItem("credit");
//       if (savedCredit !== null) {
//         setCredit(parseInt(savedCredit, 10));
//       }
//     }
//   }, []);
    return (
        <div className="w-full flex md:flex-row gap-8 flex-col">

            <Card className="w-full md:w-[65%] mx-auto bg-white/90 py-0 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/5 rounded-3xl overflow-hidden   text-left">
                <CardContent className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} id="generateURL" className="space-y-5">
                        {/* Long URL Input */}
                        <div className="space-y-2">
                            <Label htmlFor="long-url" className="text-xs md:text-sm font-semibold text-slate-700">
                                Destination URL <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative flex items-center">
                                <Link2 className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                                <Input
                                    id="long-url"
                                    type="url"
                                    required
                                    placeholder="https://example.com/my-very-long-link-path"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-11 h-10 md:h-12 text:xs md:text-base border-slate-200 focus-visible:ring-2 placeholder:text-xs md:placeholder:text-sm
                                     focus-visible:ring-blue-600  rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Custom Alias & Domain Container */}
                        <div className="space-y-2">
                            <Label htmlFor="custom-alias" className="text-xs md:text-sm font-semibold text-slate-700">
                                Customize your link <span className="text-slate-400 font-normal">(Optional)</span>
                            </Label>
                            <div className="flex flex-col sm:flex-row items-stretch gap-2">
                                <div className="flex items-center px-3.5 h-10 md:h-12 bg-slate-100 border border-slate-200 text-slate-600 text-xs md:text-sm font-medium rounded-xl select-none sm:w-1/2">
                                    minifylinks.com/
                                </div>
                                <Input
                                    id="custom-alias"
                                    type="text"
                                    placeholder="custom-alias"
                                    value={customUrl}
                                    onChange={(e) => setCustomUrl(e.target.value.trim())}
                                    className="h-10 md:h-12  text-base border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl sm:w-1/2 placeholder:text-xs md:placeholder:text-sm"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 md:h-12 text-xs md:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Shortening...
                                </>
                            ) : (
                                <>
                                    Shorten URL
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>

                    </form>

                    <p className="text-xs text-center text-slate-400 font-medium pt-2">
                        By clicking Shorten URL, you agree to our Terms of Service & Privacy Policy.
                    </p>
                </CardContent>
            </Card>
            <div className="  lg:col-span-5  flex flex-col items-center h-fit p-0 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl
               space-y-4 text-center   lg:top-6">
                {/* Ad/Credits Banner */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/40 p-3 sm:p-4 shadow-sm">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="text-left">
                            <p className="text-xs font-semibold text-slate-800">
                                Total Credit Usage
                            </p>
                            <p className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900">
                                <span className="text-xl font-medium text-slate-500 ">
                                    {myVariable} / 3
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <div className="text-left sm:text-right">
                            <p className="truncate text-xs font-medium text-slate-700">
                                Need more credits?
                            </p>
                            <p className="text-[11px] leading-tight text-slate-500">
                                Watch an ad when you have 0 credits
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="inline-flex h-8 sm:h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-blue-400 bg-white px-3 text-xs font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md cursor-pointer"
                        >
                            Watch Ads
                        </button>
                    </div>
                </div>
                {/* Features List */}
                <div className="w-full pt-2 hidden md:block">
                    <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 border-r border-slate-200 p-2 sm:p-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-fuchsia-50">
                                <FileImage className="h-4 w-4 text-fuchsia-500" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-[11px] sm:text-xs font-semibold text-slate-900">
                                    High Quality
                                </h3>
                                <p className="hidden sm:block truncate text-[10px] sm:text-[11px] text-slate-500">
                                    PNG, SVG, PDF
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 border-r border-slate-200 p-2 sm:p-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-50">
                                <Link2 className="h-4 w-4 text-cyan-500" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-[11px] sm:text-xs font-semibold text-slate-900">
                                    Customizable
                                </h3>
                                <p className="hidden sm:block truncate text-[10px] sm:text-[11px] text-slate-500">
                                    All design options
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 p-2 sm:p-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50">
                                <BarChart3 className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-[11px] sm:text-xs font-semibold text-slate-900">
                                    Trackable
                                </h3>
                                <p className="hidden sm:block truncate text-[10px] sm:text-[11px] text-slate-500">
                                    Real-time analytics
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
                        <h3 className="mb-1 text-sm font-semibold text-gray-800">
                            Watch video to reset daily limit
                        </h3>

                        <p className="mb-3 text-xs text-slate-500">
                            {canClaim
                                ? "🎉 Requirement met! You can now claim your credit."
                                : `⏳ Watch at least 30s to unlock claim button (${Math.min(watchTime, REQUIRED_WATCH_SECONDS)}s / 30s)`}
                        </p>

                        {/* Video Player */}
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                            <YouTube
                                videoId="5pZrxadytgM"
                                opts={videoOptions}
                                onReady={(e) => {
                                    playerRef.current = e.target;
                                }}
                                onEnd={() => setCanClaim(true)}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-end gap-2 items-center">
                            <button
                                onClick={handleCloseModal}
                                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-gray-800 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReset}
                                disabled={!canClaim || loading}
                                className={`rounded-lg px-4 py-1.5 text-xs font-semibold text-white transition-all ${canClaim && !loading
                                    ? "bg-green-600 hover:bg-green-700 cursor-pointer shadow-md shadow-green-600/20"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                                    }`}
                            >
                                {loading ? "Resetting..." : "Claim Credit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}