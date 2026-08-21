"use client";


import { Badge } from "@/components/ui/badge";
import { FaqSection } from "@/components/FAQs/ORCodeFAQ";
import { QRPlatformSection } from "@/components/QRComponent";
import GenerateQRCode from "@/components/home-page/generateQRcode";
import { QrCode, BarChart3, Sparkles, ScanQrCode, Link2 } from "lucide-react";

export default function QuickQrGeneratorPage() {
  const props = [
    {
      title: "Turn Instant Scans into Immediate Results with QR Codes",
      points: [
        'Create professional, scannable QR Codes quickly with no hassle.',
        'Easily distribute your QR Codes across print, digital, and packaging.',
        'Drive more engagement with no complex setup, coding, or research.'


      ],
      image: "/images/QRImage.png",
      icon: <QrCode className="h-4 w-4 text-purple-600" />
    },
    {
      title: "Fast, Reliable QR Code Generator for Business, Built for Simplicity",
      points: [
        'QR for websites, articles, social media, or campaigns in one click.',
        'Direct and permanent redirects for all QR codes that always work.',
        'Lightweight QR design for fast camera recognition and scanning'

      ],
      image: "/images/QRCodeImage.png",
      icon: <BarChart3 className="h-4 w-4 text-orange-500" />
    },
    {
      title: "Seamless QR Code Integration with Your Short Links",
      points: [
        'Create short URLs and QR Codes together in a single click.',
        'No sign-up required—download a static QR Code instantly.',
        'Safe for high-quality printing and provides high-resolution output'

      ],
      image: "/images/UrlShortImage.png",
      icon: <Sparkles className="h-4 w-4 text-purple-600" />
    },
  ]

  const cards = {
    heading: "MinifyLinks' QR Generator",
    subheading: "Everything you need to turn long web addresses into simple links and scannable QR codes",
    items: [
      {
        title: "URL Shortener",
        text: "Create clean, reliable short links in seconds.",
        icon: <Link2 />
      },
      {
        title: "Custom URL Alias",
        text: "Personalize your links with memorable custom slugs.",
        icon: <Sparkles />
      },
      {
        title: "Instant QR Generator",
        text: "Generate clear, ready-to-use QR codes automatically for any link.",
        icon: <QrCode />
      },
      {
        title: "High-Speed Redirects",
        text: "Ensure your users reach your destination smoothly without delays.",
        icon: <ScanQrCode />
      },]
  }
  return (
    <div className="pb-24 bg-slate-50 pt-20 text-slate-900 selection:bg-indigo-500 selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center relative z-10">
        <Badge variant="outline" className="mb-4 sm:mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600 inline" />
          Fast & Dynamic Link Generator
        </Badge>

        <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Generate your QR code in <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-700">
            a single click
          </span>
        </h1>
        <p className="mt-4 text-xs sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          No complex setup required—just paste your destination URL, preview live on the right, and get your print-ready vector QR code instantly.
        </p>
      </section>
      <GenerateQRCode />

      {/* PLATFORM FEATURES & FAQS */}
      <div className="mt-16 sm:mt-24">
        <QRPlatformSection props={props} cards={cards} />

        <FaqSection />
      </div>
    </div>
  );
}