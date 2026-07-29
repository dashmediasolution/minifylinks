'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, 
  Copy, 
  Check, 
  ArrowLeft, 
  Share2, 
  ExternalLink, 
  ClipboardCheck, 
  Download, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface ResultHeroProps {
  initialCode: string;
}

export function ResultHero({ initialCode }: ResultHeroProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isQrRequested = searchParams.get('qr') === 'true';

  const [displayUrl, setDisplayUrl] = useState<string>('');
  const [displayOriginal, setDisplayOriginal] = useState<string | null>(null);
  const [storageKey, setStorageKey] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  // States
  const [isCopied, setIsCopied] = useState(false);
  const [showPostClickMessage, setShowPostClickMessage] = useState(false);
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Default redirect URL
  const [activeRedirectUrl, setActiveRedirectUrl] = useState("https://republicnews.us");

  useEffect(() => {
    const storedQr = sessionStorage.getItem('latest_custom_qr_image');
    if (storedQr) {
      setQrCodeImage(storedQr);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    async function getAdLink() {
      const CACHE_KEY = 'ad_target_url_v1';
      const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 Hours

      const cached = localStorage.getItem(CACHE_KEY);

      if (cached) {
        const { url, timestamp } = JSON.parse(cached);
        const isFresh = (Date.now() - timestamp) < CACHE_DURATION;

        if (isFresh && url) {
          setActiveRedirectUrl(url);
          return;
        }
      }

      try {
        const res = await fetch('/api/admin/ad-settings');
        const data = await res.json();

        if (data.url) {
          setActiveRedirectUrl(data.url);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            url: data.url,
            timestamp: Date.now()
          }));
        }
      } catch (e) {
        console.error("Ad fetch error", e);
      }
    }
    getAdLink();

    let codeToUse = initialCode;
    if (initialCode === 'success') {
      const sessionCode = sessionStorage.getItem('latest_short_code');
      const sessionOriginal = sessionStorage.getItem('latest_original_url');
      if (!sessionCode) { router.replace('/'); return; }
      codeToUse = sessionCode;
      setDisplayOriginal(sessionOriginal);
    }

    setStorageKey(codeToUse);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setDisplayUrl(`${origin}/${codeToUse}`);

    const previouslyClicked = sessionStorage.getItem(`ad_clicked_${codeToUse}`) === 'true';
    setHasClickedAd(previouslyClicked);

    // Fire celebratory confetti
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#4f46e5', '#3b82f6', '#10b981']
      });
    }, 250);

  }, [initialCode, router]);

  const handleCopyAction = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
      setShowPostClickMessage(true);
    } catch (err) {
      console.error("Failed to copy!", err);
    }

    if (activeRedirectUrl && !hasClickedAd) {
      window.open(activeRedirectUrl, '_blank');
      fetch('/api/track-copy-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: activeRedirectUrl }),
        keepalive: true
      });
      sessionStorage.setItem(`ad_clicked_${storageKey}`, 'true');
      setHasClickedAd(true);
    }
  };

  // Social Sharing URLs
  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(displayUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(displayUrl)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(displayUrl)}`;

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3 text-blue-600">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Generating your short link...</p>
      </div>
    );
  }

  return (
    <section className="relative pt-30  pb-16 text-center space-y-8 min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">

      {/* Background Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-br from-blue-300/30 via-indigo-200/20 to-purple-300/30 blur-[60px] rounded-full pointer-events-none -z-10" />

      {/* Hero Badge & Header Text */}
      <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Link & QR Generated Successfully
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Your Link is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ready!</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
          Copy your link below or download your custom QR code to share instantly.
        </p>
      </div>

      {/* Main Result Card */}
      <Card className="relative z-10 w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden text-left">
        <CardContent className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">

          {/* --- SHORT LINK SECTION --- */}
          <div className="space-y-2.5">
            <div className="flex items-start justify-between flex-col gap-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-blue-600" /> Shortened URL
              </label>

              {displayOriginal && (
                <div className="text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-[280px]">
                  Target: {displayOriginal}
                </div>
              )}
            </div>

            {/* Input & Copy Box Container */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-slate-50 p-2 sm:p-2.5 border-2 border-blue-500/80 rounded-2xl transition-all focus-within:ring-4 focus-within:ring-blue-100">
              <div className="flex-1 min-w-0 px-3 py-2 flex items-center">
                <Globe className="w-5 h-5 text-blue-500 shrink-0 mr-2.5 hidden sm:block" />
                <span className="font-mono text-sm sm:text-base font-semibold text-slate-800 truncate select-all">
                  {displayUrl}
                </span>
              </div>

              <Button
                size="lg"
                onClick={handleCopyAction}
                className={`h-11 sm:h-12 px-6 font-bold rounded-xl text-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                  isCopied
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </Button>
            </div>

            {/* Copy Notification Toast Banner */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showPostClickMessage ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <div className="relative bg-emerald-50 border border-emerald-200 rounded-xl p-3 pr-10 flex items-center gap-3 text-emerald-900">
                <div className="bg-emerald-100 p-1.5 rounded-full shrink-0">
                  <ClipboardCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xs sm:text-sm">Copied to clipboard!</p>
                  <p className="text-[11px] text-emerald-700">You can now paste and share your link anywhere.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPostClickMessage(false)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* --- QUICK SHARE BUTTONS --- */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Quick Share To
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={shareWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent rounded-xl text-xs font-semibold text-slate-700 transition-all"
              >
                WhatsApp
              </a>
              <a
                href={shareTwitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-transparent rounded-xl text-xs font-semibold text-slate-700 transition-all"
              >
                X (Twitter)
              </a>
              <a
                href={shareLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-xl text-xs font-semibold text-slate-700 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* --- QR CODE SHOWCASE SECTION --- */}
          {qrCodeImage && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-blue-600" /> Customized QR Code
                </label>
                <span className="text-xs text-slate-400 font-medium">Ready for Print & Web</span>
              </div>

              <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                {/* QR Code Image Preview */}
                <div className="relative group p-2 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
                  <img 
                    src={qrCodeImage} 
                    alt="Customized QR Code" 
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl" 
                  />
                </div>

                {/* QR Code Info & Download Action */}
                <div className="space-y-3 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">High-Resolution QR Code</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Scannable on all mobile cameras and QR code readers. Perfect for business cards, posters, and social posts.
                    </p>
                  </div>

                  <a
                    href={qrCodeImage}
                    download="custom-qrcode.png"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download QR Code (PNG)
                  </a>
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Features Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-slate-200/60 shadow-xs text-left">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-800">Instant Redirect</p>
            <p className="text-[10px] text-slate-500">Ultra-fast cloud routing</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-slate-200/60 shadow-xs text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-800">Secure & Encrypted</p>
            <p className="text-[10px] text-slate-500">Protected link destination</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-slate-200/60 shadow-xs text-left">
          <BarChart3 className="w-4 h-4 text-blue-500 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-800">Real-Time Analytics</p>
            <p className="text-[10px] text-slate-500">Track clicks and scans</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Link */}
      <div className="relative z-10 pt-2">
        <Link href="/">
          <Button variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-transparent gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Shorten another link
          </Button>
        </Link>
      </div>

    </section>
  );
}