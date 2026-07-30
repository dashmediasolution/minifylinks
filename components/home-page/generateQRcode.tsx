'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circle, Upload, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  FileImage,
  Link2,
  QrCode,
  PlaySquare,
  ArrowRight,
  Loader2,
  CircleStop,
  SquareStop,
} from "lucide-react"; 
import Image from 'next/image';
import QRCodeStyling, { DotType, CornerSquareType } from 'qr-code-styling';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import YouTube, { YouTubeProps } from 'react-youtube';

const DOT_STYLES: { label: string; value: DotType, icon: string }[] = [
  { label: 'Square', value: 'square', icon: "/images/SQUAREQR.svg" },
  { label: 'Dots', value: 'dots', icon: "/images/QUIETROUNDEDQR.svg" },
  { label: 'Rounded', value: 'rounded', icon: "/images/ROUNDEDQR.svg" },
  { label: 'Classy', value: 'classy', icon: "/images/CLASSYQR.svg" },
];

const CORNER_STYLES: { label: string; value: CornerSquareType; icon: LucideIcon }[] = [
  { label: 'Square', value: 'square', icon: SquareStop },
  { label: 'Dot', value: 'dot', icon: CircleStop },
  { label: 'Extra Rounded', value: 'extra-rounded', icon: Circle },
];

const PRESET_COLORS = [
  { label: 'Black', hex: '#000000' },
  { label: 'Blue', hex: '#2563eb' },
  { label: 'Indigo', hex: '#4f46e5' },
  { label: 'Emerald', hex: '#059669' },
  { label: 'Red', hex: '#ff0000' },
  { label: 'Orange', hex: '#ff4d00' },
  { label: 'Yellow', hex: '#eab308' },
  { label: 'Violet', hex: '#7c3aed' },
  { label: 'Pink', hex: '#ec4899' },
];

export const videoOptions: YouTubeProps['opts'] = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    modestbranding: 1,
  },
};

export default function GenerateQRCode() {
  const [dotsColor, setDotsColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotsStyle, setDotsStyle] = useState<DotType>('rounded');
  const [cornerStyle, setCornerStyle] = useState<CornerSquareType>('extra-rounded');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [credit, setCredit] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Check if we are on the specific feature page
  const isQRGeneratorPage = pathname === '/features/qr-generator';

  // Video watch timer states
  const [watchTime, setWatchTime] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const playerRef = useRef<any>(null);

  const REQUIRED_WATCH_SECONDS = 30;

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

  const handleCloseModal = () => {
    setShowModal(false);
    setWatchTime(0);
    setCanClaim(false);
    playerRef.current = null;
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reset-limit", { method: "POST" });
      if (!res.ok) throw new Error();
      if (typeof window !== 'undefined') {
        localStorage.removeItem("credit");
      }
      setCredit(0);
      toast.success("Daily limit reset successfully!");
      handleCloseModal();
    } catch {
      toast.error("Failed to reset limit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCredit = localStorage.getItem("credit");
      if (savedCredit !== null) {
        setCredit(parseInt(savedCredit, 10));
      }
    }
  }, []);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 260,
      height: 260,
      data: url || 'https://minifylinks.com',
      image: logoUrl,
      dotsOptions: { color: dotsColor, type: dotsStyle },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: cornerStyle, color: dotsColor },
      imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: 0.3 },
    });

    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, []);

  useEffect(() => {
    if (!qrCode.current) return;

    const safeData = url.length > 1000 ? url.slice(0, 1000) : (url || 'https://minifylinks.com');

    try {
      qrCode.current.update({
        data: safeData,
        image: logoUrl,
        dotsOptions: { color: dotsColor, type: dotsStyle },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: { type: cornerStyle, color: dotsColor },
      });
    } catch (err) {
      console.error("QR Code rendering error suppressed:", err);
    }
  }, [url, dotsColor, bgColor, dotsStyle, cornerStyle, logoUrl]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url || !url.startsWith("https://")) {
      toast.error("Please enter a valid destination URL.");
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
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Link & QR processed successfully!");
        if (typeof window !== 'undefined' && data?.usage !== undefined) {
          localStorage.setItem("credit", data.usage.toString());
          setCredit(data.usage);
        }
        const origin = typeof window !== 'undefined' ? window.location.origin : '';

        const shortUrl = `${origin}/${data?.shortCode}`;

        setUrl(shortUrl);

        if (qrCode.current) {
          qrCode.current.update({
            data: shortUrl,
          });

          await new Promise((resolve) => setTimeout(resolve, 150));

          const blob = await qrCode.current.getRawData('png');

          if (blob) {
            const reader = new FileReader();

            const base64Data = await new Promise<string>((resolve) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob as Blob);
            });

            sessionStorage.setItem('latest_custom_qr_image', base64Data);
          }
        }

        sessionStorage.removeItem('latest_short_code');
        sessionStorage.removeItem('latest_original_url');
        sessionStorage.removeItem('latest_qr_code');

        sessionStorage.setItem('latest_short_code', data.shortCode);
        sessionStorage.setItem('latest_original_url', url);
        sessionStorage.setItem('latest_qr_code', data.qrCodeUrl || '');

        router.push(`/result/success`);
      } else {
        toast.error(data.error || "Failed to process request.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`mx-auto w-full bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden mt-4 sm:mt-6 text-left shadow-lg ${
      isQRGeneratorPage ? 'max-w-2xl' : 'max-w-7xl'
    }`}>
      <CardHeader className="border-b border-slate-100 px-4 sm:p-6">
        <CardTitle className="text-md sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Custom QR Code Studio
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} id="generateQR">
          <div className={isQRGeneratorPage ? 'flex flex-col gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start'}>
            
            {/* Input Controls */}
            <div className={isQRGeneratorPage ? 'w-full space-y-4' : 'order-2 lg:order-1 lg:col-span-7 space-y-6 w-full'}>
              {/* STEP 1 */}
              <div className="w-full space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                    1
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    Enter your destination URL <span className="text-red-500">*</span>
                  </h3>
                </div>

                <div className="pl-0 sm:pl-10 mt-1">
                  <Input
                    id="qr-url"
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val.length > 1000) {
                        toast.warning("URL length limit is reached");
                        setUrl(val.slice(0, 1000));
                      } else {
                        setUrl(val);
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData('text').trim();
                      if (pasted.length > 1000) {
                        e.preventDefault();
                        setUrl(pasted.slice(0, 1000));
                        toast.warning("Pasted content truncated to 1,000 characters.");
                      }
                    }}
                    className="h-10 md:h-12 text-xs md:text-base placeholder:text-xs md:placeholder:text-base border-slate-200 focus-visible:ring-blue-600 rounded-xl w-full"
                  />
                </div>
              </div>

              {/* STEPS 2, 3, 4, 5 (REMOVED ONLY ON /features/qr-generator) */}
              {!isQRGeneratorPage && (
                <>
                  {/* STEP 2 */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                        2
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold">
                        Choose your colour{" "}
                        <span className="font-normal text-slate-500 text-xs sm:text-sm">
                          (optional)
                        </span>
                      </h3>
                    </div>

                    <div className="pl-0 sm:pl-10 space-y-6 flex gap-3">
                      <div className="flex flex-wrap gap-2.5 sm:gap-2.5 items-center">
                        {PRESET_COLORS.map((preset) => {
                          const isSelected = dotsColor === preset.hex;
                          return (
                            <button
                              key={preset.hex}
                              type="button"
                              title={preset.label}
                              aria-label={preset.label}
                              onClick={() => setDotsColor(preset.hex)}
                              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 border-2 transition-all cursor-pointer flex items-center justify-center ${isSelected
                                ? 'border-blue-600 scale-110 ring-2 ring-blue-600/30'
                                : 'border-transparent hover:scale-105 opacity-85 hover:opacity-100'
                                }`}
                            >
                              <span
                                className="w-full h-full rounded-full border border-black/10 shadow-inner"
                                style={{ backgroundColor: preset.hex }}
                              />
                            </button>
                          );
                        })}
                        <div className="relative w-10 h-10 shrink-0">
                          <div
                            className="absolute inset-0 rounded-full border border-slate-200 pointer-events-none"
                            style={{
                              background: 'conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)'
                            }}
                          />

                          <Input
                            type="color"
                            value={dotsColor || '#000000'}
                            onChange={(e) => setDotsColor(e.target.value)}
                            className="w-full h-full opacity-0 cursor-pointer rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                        3
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold">
                        Choose a style{" "}
                        <span className="font-normal text-slate-500 text-xs sm:text-sm">
                          (optional)
                        </span>
                      </h3>
                    </div>

                    <div className="pl-0 sm:pl-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-medium text-slate-700">
                            Pattern
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {DOT_STYLES.map((style) => (
                              <button
                                key={style.value}
                                type="button"
                                title={style.label}
                                aria-label={style.label}
                                onClick={() => setDotsStyle(style.value)}
                                className={`h-12 text-xs font-medium rounded-xl border transition-all flex items-center justify-center p-1.5 cursor-pointer ${dotsStyle === style.value
                                  ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 scale-105"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                  }`}
                              >
                                <Image
                                  src={style.icon}
                                  alt={style.label}
                                  width={32}
                                  height={32}
                                  className="object-contain w-auto h-full"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-medium text-slate-700">
                            Corners
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {CORNER_STYLES.map((style) => {
                              const IconComponent = style.icon;
                              const isSelected = cornerStyle === style.value;

                              return (
                                <button
                                  key={style.value}
                                  type="button"
                                  title={style.label}
                                  aria-label={style.label}
                                  onClick={() => setCornerStyle(style.value)}
                                  className={`w-10 h-10 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${isSelected
                                    ? "border-blue-600 bg-blue-50 text-blue-600 scale-105 ring-2 ring-blue-600/20"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                                >
                                  <IconComponent className="w-5 h-5" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 4 */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                        4
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold">
                        Add your logo{" "}
                        <span className="font-normal text-slate-500 text-xs sm:text-sm">
                          (optional)
                        </span>
                      </h3>
                    </div>

                    <div className="pl-0 sm:pl-10 relative">
                      <label
                        htmlFor="logo-upload"
                        className={`group flex min-h-[80px] sm:min-h-[100px] w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-3 sm:p-4 transition-all ${logoUrl
                          ? "border-blue-200 bg-blue-50/40"
                          : "border-slate-200 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/30"
                          }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt="Logo preview"
                                className="h-full w-full object-contain p-1.5"
                              />
                            ) : (
                              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 transition-transform group-hover:-translate-y-1" />
                            )}
                          </div>

                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800">
                              {logoUrl ? "Logo uploaded" : "Upload your logo"}
                            </p>
                            <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500">
                              {logoUrl
                                ? "Click to replace your current logo"
                                : "PNG, JPG or SVG · Max 1MB"}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all group-hover:border-blue-200 group-hover:text-blue-600">
                          {logoUrl ? "Change" : "Browse"}
                        </span>

                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/svg+xml"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>

                      {logoUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoUrl("")}
                          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-sm transition-all hover:scale-110 hover:bg-red-50"
                          aria-label="Remove logo"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {/* STEP 5 */}
                  <div className="w-full space-y-3 hidden md:block">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                        5
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        When credits run out
                      </h3>
                    </div>

                    <div className="pl-0 sm:pl-10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                            <PlaySquare className="h-5 w-5 text-purple-600" />
                          </div>
                          <p className="text-xs leading-relaxed text-slate-700">
                            Watch ads to refresh credits and keep creating without interruptions.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowModal(true)}
                          className="w-full sm:w-auto inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
                        >
                          Watch Ads
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Mobile Submit Button (Only used when in side-by-side mode on mobile) */}
              {!isQRGeneratorPage && (
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:hidden h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating QR...
                    </>
                  ) : (
                    <>
                      Download Custom QR
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Live Preview & Direct Download Panel */}
            <div className={isQRGeneratorPage ? 'w-full flex flex-col items-center p-4 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 text-center' : 'order-1 lg:order-2 lg:col-span-5 w-full flex flex-col items-center h-fit p-0 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 text-center lg:sticky lg:top-6'}>
              
              {/* Total Credit Usage & Watch Ads Banner */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/40 p-3 sm:p-4 shadow-sm">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-800">
                      Total Credit Usage
                    </p>
                    <p className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900">
                      <span className="text-xl font-medium text-slate-500">
                        {credit} / 3
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

              {/* QR Code Canvas Preview */}
              <div className="w-full p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-center min-h-[100px] sm:min-h-[140px] md:h-[260px]">
                <div ref={ref} className="w-full flex items-center justify-center " />   
                           </div>
              <p className="text-xs text-slate-500 max-w-xs">
                This preview will be saved when you click Download Custom QR.
              </p>

              {/* Main Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating QR...
                  </>
                ) : (
                  <>
                    Download Custom QR
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

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

          </div>
        </form>
      </CardContent>

      {/* AD WATCH MODAL */}
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
                type="button"
                onClick={handleCloseModal}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
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
    </Card>
  );
}