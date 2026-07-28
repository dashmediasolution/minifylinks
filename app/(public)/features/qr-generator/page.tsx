"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCodeStyling from "qr-code-styling";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Sparkles, ArrowRight, Loader2, Link2, Download } from "lucide-react";
import { toast } from "sonner";
import { FaqSection } from "@/components/home-page/FaqSection";
import {QRPlatformSection} from "@/components/QRComponent";

export default function QuickQrGeneratorPage() {
  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  // Initialize QR Code Instance on mount
  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 240,
      height: 240,
      data: url || "https://minifylinks.com",
      dotsOptions: { color: "#4f46e5", type: "square" },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { type: "square", color: "#4f46e5" },
      imageOptions: { crossOrigin: "anonymous", margin: 4 },
    });

    if (ref.current) {
      ref.current.innerHTML = "";
      qrCode.current.append(ref.current);
    }
  }, []);

  // Update QR Code canvas dynamically as URL changes
  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      data: url || "https://minifylinks.com",
    });
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a valid destination URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          customUrl: customUrl.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("QR code generated successfully!");
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const shortUrl = `${origin}/${data?.shortCode}`;

        // 1. Update QR Code instance with final short code and render blob
        if (qrCode.current) {
          qrCode.current.update({
            data: shortUrl,
          });

          const blob = await qrCode.current.getRawData("png");
          if (blob) {
            await new Promise<void>((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob as Blob);
              reader.onloadend = () => {
                sessionStorage.setItem("latest_custom_qr_image", reader.result as string);
                resolve();
              };
            });
          }
        }

        // 2. Clear old items and write new session items
        sessionStorage.removeItem("latest_short_code");
        sessionStorage.removeItem("latest_original_url");
        sessionStorage.removeItem("latest_qr_code");

        sessionStorage.setItem("latest_short_code", data.shortCode);
        sessionStorage.setItem("latest_original_url", url);
        sessionStorage.setItem("latest_qr_code", data.qrCodeUrl || "");

        // 3. Navigate to result page
        router.push(`/result/success`);
      } else {
        toast.error(data.error || "Failed to process request.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 bg-slate-50 pt-20 text-slate-900 selection:bg-indigo-500 selection:text-white min-h-screen">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-200/50 via-purple-100/50 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center relative z-10">
        <Badge variant="outline" className="mb-4 sm:mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600 inline" />
          Fast & Dynamic Link Generator
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
          Generate your QR code in <br />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            a single click
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          No complex setup required—just paste your destination URL, preview live on the right, and get your print-ready vector QR code instantly.
        </p>
      </section>

      {/* GENERATOR WORKSPACE - TWO COLUMNS */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column - Input Form */}
            <div className="lg:col-span-7">
              <Card className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-5 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2.5">
                    <QrCode className="w-6 h-6 text-indigo-600" />
                    Generate Your QR Code
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="qr-url"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Destination URL <span className="text-red-500">*</span>
                    </label>

                    <div className="relative flex items-center">
                      <Link2 className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                      <Input
                        id="qr-url"
                        type="url"
                        required
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value.trim())}
                        className="h-12 pl-11 pr-4 border-slate-200 focus-visible:ring-indigo-600 rounded-xl w-full text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating QR Code...
                      </>
                    ) : (
                      <>
                        Generate & Download QR
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Live QR Code Preview */}
            <div className="lg:col-span-5 w-full flex flex-col items-center p-5 sm:p-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl shadow-lg text-center lg:sticky lg:top-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Live Preview
              </div>

              {/* QR Code Canvas */}
              <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-center min-h-[260px]">
                <div ref={ref} className="flex justify-center max-w-full overflow-hidden" />
              </div>

              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                {url ? "Your live QR code is ready." : "Enter a URL on the left to see your live preview update."}
              </p>
            </div>

          </div>
        </form>
      </section>

      {/* PLATFORM FEATURES & FAQS */}
      <div className="mt-16 sm:mt-24">
        <QRPlatformSection />
        <FaqSection />
      </div>
    </div>
  );
}