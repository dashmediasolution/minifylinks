"use client";

import Image from "next/image";
import {
  Palette,
  ImageIcon,
  Sparkles,
  Focus,
  Grid,
  ShieldCheck,
  FileCode,
} from "lucide-react";
import GenerateQRCode from "@/components/home-page/generateQRcode";
import { FaqSection } from "@/components/home-page/FaqSection";
import { Card, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {QRPlatformSection} from "@/components/QRComponent";
export default function CustomizeQrPage() {


  return (
    <div className="pb-24 bg-slate-50 pt-20 text-slate-900 selection:bg-indigo-500 selection:text-white">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-200/50 via-purple-100/50 to-transparent blur-3xl pointer-events-none rounded-full" />

       <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center relative z-10">
        <Badge variant="outline" className="mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600" />
          Advanced QR Vector Design Studio
        </Badge>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
          Customize every pixel of <br />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            your branded QR code
          </span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Full design control: tweak colors, corner eye shapes, pixel patterns, callout frames, and center logo overlays—all backed by dynamic link tracking.
        </p>
      </section>

       <section className="px-6 w-screen mx-auto relative z-10">
        <GenerateQRCode />
      </section>

       <section className="mt-24 px-6 max-w-7xl mx-auto mb-18">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="border-slate-300 text-slate-600 mb-3">Feature Studio Breakdown</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything you can customize in our QR Studio
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Unlike static generators, SnipLink offers total control over geometry, brand aesthetics, error tolerance, and export formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

           <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Color Palette</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Match your brand guidelines. Select custom hex/RGB colors for foreground pixels, background canvas, and corner eye frames separately.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
              <Focus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Corner & Eye Styling</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Swap out standard square corner detectors for rounded borders, circular eyes, or sharp outer edges to match your brand feel.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Grid className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Pattern Matrix</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Replace standard blocky modules with smooth dots, rounded blocks, or diamond grids without compromising scanning speed.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600 mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Logo & Icon Embedding</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload your official logo, product badge, or social icon to auto-embed right in the center with automated padding.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lossless Vector Downloads</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Export in vector formats (SVG, PDF, EPS) that scale up to massive billboard sizes without blurriness, or high-res PNGs.
            </p>
          </Card>
 
        
          {/* Feature 8 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">High Error Correction (30%)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Built-in Level H error correction ensures your QR codes remain readable even if partially covered or damaged in print.
            </p>
          </Card>

           

        </div>
      </section>

     
            <QRPlatformSection/>
      
      <FaqSection />

    </div>
  );
}