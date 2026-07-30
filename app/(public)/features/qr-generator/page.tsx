"use client";


import { Badge } from "@/components/ui/badge";
import { Sparkles, } from "lucide-react";
import { FaqSection } from "@/components/home-page/FaqSection";
import { QRPlatformSection } from "@/components/QRComponent";
import GenerateQRCode from "@/components/home-page/generateQRcode";
export default function QuickQrGeneratorPage() {

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
        <QRPlatformSection />
        <FaqSection />
      </div>
    </div>
  );
}