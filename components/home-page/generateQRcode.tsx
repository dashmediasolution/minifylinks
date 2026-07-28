'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circle, Upload, LucideIcon } from 'lucide-react';
import {
  BarChart3,
  FileImage,
  Link2,
  Play,
} from "lucide-react";
import { QrCode, Image as ImageIcon, PlaySquare, ArrowRight, Loader2, CircleStop, SquareStop } from 'lucide-react';
import QRCodeStyling, { DotType, CornerSquareType } from 'qr-code-styling';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const DOT_STYLES: { label: string; value: DotType }[] = [
  { label: 'Square', value: 'square' },
  { label: 'Dots', value: 'dots' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Classy', value: 'classy' },
];

const CORNER_STYLES: { label: string; value: CornerSquareType; icon: LucideIcon }[] = [
  { label: 'Square', value: 'square', icon: SquareStop },
  { label: 'Dot', value: 'dot', icon: CircleStop },
  { label: 'Extra Rounded', value: 'extra-rounded', icon: Circle },
];

const PRESET_COLORS = [
  { label: 'Black', hex: '#0f172a' },
  { label: 'Blue', hex: '#2563eb' },
  { label: 'Indigo', hex: '#4f46e5' },
  { label: 'Emerald', hex: '#059669' },
  { label: 'Red', hex: '#ff0000' },
  { label: 'Orange', hex: '#ff4d00' },
  { label: 'Yellow', hex: '#eab308' },
  { label: 'Violet', hex: '#7c3aed' },
  { label: 'Pink', hex: '#ec4899' },
];

export interface QRCustomizeOptions {
  dotsColor: string;
  bgColor: string;
  dotsStyle: DotType;
  cornerStyle: CornerSquareType;
  logoUrl: string;
  customImageDataUrl?: string;
  formId?: string;
}

export default function GenerateQRCode() {
  const [dotsColor, setDotsColor] = useState('#2563eb');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotsStyle, setDotsStyle] = useState<DotType>('rounded');
  const [cornerStyle, setCornerStyle] = useState<CornerSquareType>('extra-rounded');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reset-limit", { method: "POST" });
      if (!res.ok) throw new Error();

      toast.success("Daily limit reset successfully!");
      setShowModal(false); // Close popup
    } catch {
      toast.error("Failed to reset limit.");
    } finally {
      setLoading(false);
    }
  };
  // Initialize QR Code Instance
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

  // Update QR Code on state change
  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      data: url || 'https://minifylinks.com',
      image: logoUrl,
      dotsOptions: { color: dotsColor, type: dotsStyle },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: cornerStyle, color: dotsColor },
    });
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

    if (!url) {
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
        const origin = typeof window !== 'undefined' ? window.location.origin : '';

        // 1. Create the new short URL string
        const shortUrl = `${origin}/${data?.shortCode}`;

        // 2. Update React State for the UI input field
        setUrl(shortUrl);

        // 3. Synchronously update the QR instance with the NEW shortUrl
        if (qrCode.current) {
          qrCode.current.update({
            data: shortUrl,
          });

          // 4. Extract the raw image blob generated from the shortUrl
          const blob = await qrCode.current.getRawData('png');
          if (blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob as Blob);

            // Wait for reading to complete before storing & navigating
            await new Promise<void>((resolve) => {
              reader.onloadend = () => {
                sessionStorage.setItem('latest_custom_qr_image', reader.result as string);
                resolve();
              };
            });
          }
        }

        // Clear & set session items
        sessionStorage.removeItem('latest_short_code');
        sessionStorage.removeItem('latest_original_url');
        sessionStorage.removeItem('latest_qr_code');

        sessionStorage.setItem('latest_short_code', data.shortCode);
        sessionStorage.setItem('latest_original_url', url); // original input URL
        sessionStorage.setItem('latest_qr_code', data.qrCodeUrl || '');

        // 5. Navigate after storage is populated
        router.push(`/result/success?qr=true`);
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
    <Card className="max-w-7xl mx-auto w-full bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden mt-4 sm:mt-6 text-left shadow-lg">
      <CardHeader className="border-b border-slate-100 p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Custom QR Code Studio
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} id="generateQR">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Form Controls Left Side */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 w-full">

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
                    onChange={(e) => setUrl(e.target.value.trim())}
                    className="h-12 border-slate-200 focus-visible:ring-blue-600 rounded-xl w-full"
                  />
                </div>
              </div>

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

                <div className="pl-0 sm:pl-10 space-y-6">
                  {/* Preset Colors */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 items-center">
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
                  </div>

                  {/* Custom Pickers */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                    <div className="space-y-1.5 flex-1">
                      <Label className="text-xs font-medium text-slate-600">Custom Foreground</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={dotsColor}
                          onChange={(e) => setDotsColor(e.target.value)}
                          className="w-12 h-10 p-1 cursor-pointer rounded-lg border-slate-200 shrink-0"
                        />
                        <Input
                          type="text"
                          value={dotsColor}
                          onChange={(e) => setDotsColor(e.target.value)}
                          className="h-10 text-xs uppercase font-mono border-slate-200 rounded-lg flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <Label className="text-xs font-medium text-slate-600">Custom Background</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-12 h-10 p-1 cursor-pointer rounded-lg border-slate-200 shrink-0"
                        />
                        <Input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="h-10 text-xs uppercase font-mono border-slate-200 rounded-lg flex-1"
                        />
                      </div>
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
                    {/* Pattern */}
                    <div className="space-y-2">
                      <Label className="text-xs sm:text-sm font-medium text-slate-700">
                        Pattern
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DOT_STYLES.map((style) => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setDotsStyle(style.value)}
                            className={`h-10 px-2 text-xs font-medium rounded-xl border transition-all flex items-center justify-center text-center ${dotsStyle === style.value
                              ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-2 ring-blue-600/20"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Corners */}
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
                      {/* Logo Preview / Upload Icon */}
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

                      {/* Text */}
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

                    {/* Upload Button */}
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

                  {/* Remove Button */}
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
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-sm font-semibold text-blue-600">
                    5
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    When credits run out
                  </h3>
                </div>

                <div className="pl-0 sm:pl-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    {/* Left Content */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                        <PlaySquare className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-700">
                        Watch ads to refresh credits and keep creating without interruptions.
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="w-full sm:w-auto inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                      Watch Adsx
                    </button>
                  
                  </div>
                </div>
              </div>

            </div>

            {/* Live Preview & Direct Download Right Side */}
            <div className="lg:col-span-5 w-full flex flex-col items-center h-fit p-4 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 text-center lg:sticky lg:top-6">

              {/* Ad/Credits Banner */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/40 p-3 sm:p-4 shadow-sm">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  {/* Credits */}
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-800">
                      Total Credit Limit
                    </p>
                    <p className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900">

                      <span className="text-xl font-medium text-slate-500 ">
                        3
                      </span>
                    </p>
                  </div>

                </div>

                {/* Ad Information & Watch Button */}
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
                    className="inline-flex h-8 sm:h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-blue-400 bg-white px-3 text-xs font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
                    >
                      Watch Ads
                    </button>
                  

                 
                </div>
              </div>

              {/* QR Code Canvas Card */}
              <div className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-center min-h-[260px] overflow-x-auto">
                <div ref={ref} className="max-w-full overflow-hidden flex justify-center" />
              </div>

              <p className="text-xs text-slate-500 max-w-xs">
                This preview will be saved when you click Download Custom QR.
              </p>

              {/* Submit Button */}
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
              <div className="w-full pt-2">
                <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  {/* Feature 1 */}
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

                  {/* Feature 2 */}
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

                  {/* Feature 3 */}
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">
              Watch video to reset daily limit
            </h3>

            {/* Video Player */}
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/5pZrxadytgM?autoplay=1"
                title="Ad Video"
                allow="autoplay"
                allowFullScreen
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-semibold  hover:bg-green-700 disabled:opacity-50"
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