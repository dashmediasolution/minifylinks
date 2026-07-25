'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowRight, Link2, QrCode, Sparkles, Loader2 } from 'lucide-react';

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
        {number}
      </span>
      <span className="text-xs sm:text-sm font-bold text-blue-100 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function HeroSection() {
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [generateQr, setGenerateQr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a URL to shorten.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          customUrl: customUrl.trim(),
          generateQr
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Link shortened successfully!");

        // Save metadata to session storage for the results screen
        sessionStorage.setItem('latest_short_code', data.shortCode);
        sessionStorage.setItem('latest_original_url', url);
        if (data.qrCodeUrl) {
          sessionStorage.setItem('latest_qr_code', data.qrCodeUrl);
        }

        router.push(`/result/success?qr=${generateQr}`);
      } else {
        toast.error(data.error || "Failed to shorten link.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative pt-24 sm:pt-32 pb-16 text-center px-4 sm:px-6 lg:px-8 overflow-hidden" id="hero-section">
        {/* Ambient Background Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-blue-200/50 to-indigo-200/40 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Fast, Reliable & Free URL Shortener</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Shorten links, create QR codes, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              and expand your reach.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Minifylinks gives you total control over your short links with custom alias branding and instant QR code generation.
          </p>

          {/* TinyURL-Style Unified Input Box */}
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/5 rounded-3xl overflow-hidden mt-8 text-left">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Long URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="long-url" className="text-sm font-semibold text-slate-700">
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
                      className="pl-11 h-12 text-base border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl"
                    />
                  </div>
                </div>

                {/* Custom Alias & Domain Container */}
                <div className="space-y-2">
                  <Label htmlFor="custom-alias" className="text-sm font-semibold text-slate-700">
                    Customize your link <span className="text-slate-400 font-normal">(Optional)</span>
                  </Label>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <div className="flex items-center px-3.5 h-12 bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl select-none sm:w-1/2">
                      minifylinks.com/
                    </div>
                    <Input
                      id="custom-alias"
                      type="text"
                      placeholder="custom-alias"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value.trim())}
                      className="h-12 text-base border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl sm:w-1/2"
                    />
                  </div>
                </div>

                {/* Options / Checkboxes */}
                <div className="pt-1 flex items-center space-x-2">
                  <Checkbox
                    id="qr-option"
                    checked={generateQr}
                    onCheckedChange={(checked) => setGenerateQr(!!checked)}
                    className="border-slate-300 data-[state=checked]:bg-blue-600"
                  />
                  <Label
                    htmlFor="qr-option"
                    className="text-sm text-slate-600 font-medium cursor-pointer flex items-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4 text-slate-500" />
                    Generate a QR code for this link
                  </Label>
                </div>

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
        </div>
      </section>

      {/* Analytics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 py-12 px-6 sm:px-10 bg-gradient-to-r from-blue-600 to-indigo-700 max-w-full mx-0 relative z-10 shadow-inner">
        <StatItem number="350K+" label="Short Links Created" />
        <StatItem number="5M+" label="Clicks this Month" />
        <StatItem number="99.9%" label="Uptime Guarantee" />
        <StatItem number="100%" label="Free to Use" />
      </div>
    </>
  );
}