"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Link2, 
  QrCode, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  Download, 
  Play, 
  Share2, 
  Lock, 
  Calendar, 
  Palette, 
  LayoutGrid, 
  Image as ImageIcon, 
  Settings2, 
  MousePointerClick, 
  Layers, 
  CheckCircle2,
  Tag
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShortenerProductPage() {
  // --- URL Shortener State ---
  const [longUrl, setLongUrl] = useState("");
  const [customDomain, setCustomDomain] = useState("snip.link");
  const [customSlug, setCustomSlug] = useState("");
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [shortenedResult, setShortenedResult] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // --- QR Code Customizer State ---
  const [qrTarget, setQrTarget] = useState("https://yourbrand.com/menu");
  const [fgColor, setFgColor] = useState("#4f46e5"); // Indigo
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrPattern, setQrPattern] = useState<"squares" | "dots" | "rounded">("rounded");
  const [frameText, setFrameText] = useState("SCAN ME");
  const [hasLogo, setHasLogo] = useState(true);
  const [qrGenerated, setQrGenerated] = useState(true);

  // Handlers
  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) return;
    const finalSlug = customSlug.trim() ? customSlug.trim() : "x9k2p4";
    setShortenedResult(`https://${customDomain}/${finalSlug}`);
  };

  const copyToClipboard = () => {
    if (!shortenedResult) return;
    navigator.clipboard.writeText(shortenedResult);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Light Gradient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-indigo-200/40 via-violet-100/60 to-blue-100/30 blur-3xl pointer-events-none rounded-full" />

      {/* Header Navigation */}
      <header className="border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-50 bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Link2 className="w-5 h-5" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">SnipLink Studio</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#shortener" className="hover:text-indigo-600 transition-colors">URL Customizer</a>
            <a href="#qr-studio" className="hover:text-indigo-600 transition-colors">QR Studio</a>
            <a href="#demo" className="hover:text-indigo-600 transition-colors">Live Demo</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#analytics" className="hover:text-indigo-600 transition-colors">Analytics</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 hover:bg-slate-100">Sign In</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 font-semibold">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center relative z-10">
        <Badge variant="outline" className="mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600" />
          Complete Link Management & Custom QR Platform
        </Badge>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
          Transform boring URLs into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            powerful brand touchpoints
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Create branded short links with custom aliases, password security, and build fully stylized, dynamic QR codes with live color patterns and logo integration.
        </p>
      </section>

      {/* DEDICATED CARDS SECTION: URL SHORTENER & QR CODE CUSTOMIZER */}
      <section className="pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* CARD 1: URL SHORTENER & CUSTOM ALIAS STUDIO */}
          <Card id="shortener" className="border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-slate-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Link2 className="w-5 h-5" />
                </div>
                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Custom Domains & Slugs</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Short Link Customizer</CardTitle>
              <CardDescription className="text-slate-500">
                Shorten links and customize domain slugs, UTM tags, and security settings.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              <form onSubmit={handleShorten} className="space-y-4">
                {/* Destination URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Destination URL</label>
                  <Input
                    type="url"
                    placeholder="https://yourbrand.com/products/summer-sale-campaign-2026"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-600 text-slate-900 h-11"
                    required
                  />
                </div>

                {/* Custom Domain & Custom Slug Split Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Customize Domain & Short Slug</label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    <select
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="sm:col-span-2 h-11 px-3 rounded-md bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="snip.link">snip.link (Default)</option>
                      <option value="go.yourbrand.com">go.yourbrand.com</option>
                      <option value="link.store">link.store</option>
                    </select>

                    <div className="sm:col-span-3 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">/</span>
                      <Input
                        type="text"
                        placeholder="summer-sale"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="bg-slate-50 border-slate-200 pl-7 focus-visible:ring-indigo-600 text-slate-900 h-11 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Customizations Accordion/Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Settings2 className="w-4 h-4 text-indigo-600" /> Advanced Options
                    </span>
                    <span className="text-indigo-600 font-normal">Optional</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                      <input 
                        type="checkbox" 
                        checked={enablePassword} 
                        onChange={(e) => setEnablePassword(e.target.checked)} 
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                      <Lock className="w-3.5 h-3.5" /> Password Protect
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      <Calendar className="w-3.5 h-3.5" /> Expiration Date
                    </label>
                  </div>

                  {enablePassword && (
                    <Input
                      type="password"
                      placeholder="Set link password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white border-slate-200 h-9 text-xs"
                    />
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-11 shadow-md shadow-indigo-600/20">
                  Create Custom Link <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Shortened Output Result Card */}
              {shortenedResult && (
                <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between gap-4 animate-in fade-in-50">
                  <div className="min-w-0">
                    <p className="text-xs text-indigo-700 font-semibold mb-0.5">Your Custom Branded Link:</p>
                    <p className="font-mono text-indigo-950 font-bold text-base truncate">{shortenedResult}</p>
                  </div>
                  <Button onClick={copyToClipboard} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                    {copiedUrl ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span className="ml-1.5">{copiedUrl ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CARD 2: DYNAMIC QR CODE CUSTOMIZER STUDIO */}
          <Card id="qr-studio" className="border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/30 border-b border-slate-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-sm">
                  <QrCode className="w-5 h-5" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">Custom Vector QR</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">QR Code Customizer Studio</CardTitle>
              <CardDescription className="text-slate-500">
                Customize colors, pattern styles, frame labels, and embedded brand logos.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {/* QR Code Target URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">QR Target Content</label>
                <Input
                  type="text"
                  placeholder="https://yourbrand.com/menu"
                  value={qrTarget}
                  onChange={(e) => setQrTarget(e.target.value)}
                  className="bg-slate-50 border-slate-200 focus-visible:ring-purple-600 text-slate-900 h-10 text-sm"
                />
              </div>

              {/* Customization Options Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Foreground Color Picker */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-purple-600" /> Color Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0 bg-transparent"
                    />
                    <span className="font-mono text-xs uppercase text-slate-600">{fgColor}</span>
                  </div>
                </div>

                {/* Frame Text Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Frame Callout</label>
                  <Input
                    type="text"
                    placeholder="SCAN ME"
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    className="bg-slate-50 border-slate-200 h-8 text-xs"
                  />
                </div>

                {/* Pattern Style Picker */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Pattern Shape</label>
                  <div className="flex gap-1.5">
                    {(["rounded", "squares", "dots"] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setQrPattern(style)}
                        className={`px-2.5 py-1 text-xs rounded border capitalize transition-colors ${
                          qrPattern === style 
                            ? "bg-purple-600 text-white border-purple-600 font-medium" 
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Overlay Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Brand Logo</label>
                  <button
                    type="button"
                    onClick={() => setHasLogo(!hasLogo)}
                    className={`w-full py-1 px-3 text-xs rounded border flex items-center justify-center gap-1.5 transition-colors ${
                      hasLogo 
                        ? "bg-purple-50 text-purple-700 border-purple-300 font-medium" 
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    {hasLogo ? "Logo Overlay Active" : "No Logo"}
                  </button>
                </div>
              </div>

              {/* LIVE DYNAMIC QR PREVIEW BOX */}
              <div className="pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-6 justify-between">
                  {/* Simulated QR Code Visual Output */}
                  <div className="relative flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm shrink-0">
                    {/* Frame Text Banner */}
                    {frameText && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-white px-3 py-0.5 rounded-full mb-2" style={{ backgroundColor: fgColor }}>
                        {frameText}
                      </span>
                    )}

                    {/* QR Pixel Matrix Simulation */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className={`w-full h-full grid grid-cols-5 gap-1 p-1 ${qrPattern === 'dots' ? 'rounded-full' : ''}`}>
                        {[...Array(25)].map((_, i) => (
                          <div
                            key={i}
                            className={`transition-all ${
                              i % 2 === 0 ? "opacity-100" : "opacity-30"
                            } ${
                              qrPattern === "rounded" 
                                ? "rounded-xs" 
                                : qrPattern === "dots" 
                                ? "rounded-full" 
                                : "rounded-none"
                            }`}
                            style={{ backgroundColor: fgColor }}
                          />
                        ))}
                      </div>

                      {/* Embedded Logo Mock */}
                      {hasLogo && (
                        <div className="absolute inset-0 m-auto w-7 h-7 bg-white rounded-md border border-slate-200 shadow-md flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <h4 className="text-sm font-bold text-slate-900">Customized & Vector Ready</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      High-resolution vectors (SVG, PNG, PDF) suitable for both print materials and digital displays.
                    </p>
                    <div className="flex gap-2 justify-center sm:justify-start pt-1">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-8">
                        <Download className="w-3.5 h-3.5 mr-1" /> SVG Vector
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 text-xs h-8">
                        PNG
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* MEDIA DEMO / ANIMATED GIF PREVIEW SECTION */}
      <section id="demo" className="py-20 bg-gradient-to-b from-slate-100/70 via-indigo-50/30 to-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Explanation Column */}
            <div className="space-y-6">
              <Badge variant="outline" className="border-indigo-300 bg-indigo-50 text-indigo-700">
                Real-Time Workflow Demo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Watch dynamic redirection & analytics in real time
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Update destination links after printing banners or flyers without reissuing QR codes or broken links. Inspect live clicks, locations, and referrer tags.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base">Instant Destination Swaps</h4>
                    <p className="text-sm text-slate-500">Change where your link or QR code points to in under 2 seconds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700 shrink-0 mt-0.5">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base">Live Heatmaps & Geo-Attribution</h4>
                    <p className="text-sm text-slate-500">Track click rates across cities, browsers, and social campaigns.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side GIF / Media Showcase Box */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-indigo-100 overflow-hidden group">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {/* Demo GIF Placeholder Background Image */}
                <Image
                  src="/photo.jpg" 
                  alt="Platform Animated Dashboard Demo"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Animated Play Badge */}
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-indigo-600/90 text-white backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform flex items-center justify-center">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Media Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Animated Demo Preview (.GIF)
                  </span>
                  <span className="text-slate-500 text-[11px]">0:12 Loop</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EXTENSIVE FEATURE LIST SHOWCASE */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="border-slate-300 text-slate-600 mb-3">Complete Feature Matrix</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Everything needed to optimize link conversions</h2>
          <p className="text-slate-600 mt-3 text-lg">Built for marketers, creators, and enterprise teams managing thousands of URLs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Branded Domains</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Replace standard URLs with custom subdomains like `link.yourbrand.com` to increase click-through rates by up to 34%.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Dynamic Vector QR Codes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Design QR codes with custom dots, frames, brand logos, and export in SVG, PNG, or PDF formats for print.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Password Protection</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Secure sensitive links or private files with encrypted password access before redirecting visitors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600 mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Link Expiration Rules</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Set links to automatically expire based on date thresholds or maximum click limits for limited-time offers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">UTM Parameter Builder</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Auto-attach Google Analytics UTM tags (`utm_source`, `utm_medium`, `utm_campaign`) to track attribution cleanly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-rose-50 text-rose-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Malware & Spam Protection</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time threat detection blocks malicious phishing destination links automatically to protect your brand reputation.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 px-6 max-w-5xl mx-auto mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-10 md:p-14 text-center text-white shadow-2xl shadow-indigo-200">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to customize your links?</h2>
          <p className="mt-4 text-indigo-100 max-w-xl mx-auto text-lg">
            Join over 500,000 businesses and creators creating smarter links and custom QR codes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-slate-100 font-bold px-8 h-12 shadow-lg">
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" className="border-indigo-300 text-white hover:bg-indigo-700/50 h-12">
              Explore Enterprise Plans
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-sm text-slate-500 text-center">
        <p>© {new Date().getFullYear()} SnipLink Platform. Built with Next.js, Tailwind CSS & shadcn/ui.</p>
      </footer>
    </div>
  );
}