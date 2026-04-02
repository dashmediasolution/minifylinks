'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">{number}</span>
      <span className="text-[10px] sm:text-sm font-bold text-blue-100 uppercase tracking-widest">{label}</span>
    </div>
  )
}

export function HeroSection() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault(); // ChatInputSubmit handles click, but good to have safeguard
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Link shortened successfully!")

        // --- 1. Save Real Data to Session Storage ---
        sessionStorage.setItem('latest_short_code', data.shortCode);
        sessionStorage.setItem('latest_original_url', url);

        // --- 2. Redirect to existing page with a GENERIC placeholder ---
        router.push('/result/success');

      } else {
        toast.error(data.error || "Failed to shorten link.")
      }
    } catch (err) {
      toast.error("Network Error.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-20 text-center px-6 lg:px-0 overflow-hidden" id='hero-section'>
      {/* Ambient Background Gradients */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[1000px] h-[400px] lg:h-[600px] bg-gradient-to-tr from-blue-100/60 to-indigo-100/40 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-sky-100/50 blur-[60px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-0 space-y-8">
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-bold tracking-wide uppercase mb-2">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
          Free URL Shortener
        </div> */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          URL Shortener: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">
           Enhance Your Outreach Potential.
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Minifylinks is a free, powerful URL shortener that transforms your long, messy links into clean and memorable links in seconds.
        </p>

      <Card className="max-w-2xl lg:max-w-3xl mx-auto bg-transparent border-none relative z-10 py-6 sm:py-8 mb-4">
        <CardContent className="px-0 sm:px-8">
            <ChatInput 
                variant="default"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onSubmit={handleSubmit}
                loading={loading}
                className='border-2 border-blue-500 bg-white/90 backdrop-blur-sm shadow-[0_0_40px_-10px_rgba(37,99,235,0.2)] rounded-3xl'
            >
                <ChatInputTextArea placeholder="Paste your long link here..." className="text-sm md:text-lg min-h-[50px]" />
                <ChatInputSubmit className="bg-blue-600 hover:bg-blue-700 text-white border-transparent h-10 w-10 sm:h-12 sm:w-12 rounded-xl transition-transform hover:scale-105" />
            </ChatInput>
          <p className="text-xs text-slate-500 mt-4 z-10 relative font-medium">By using this service, you agree to our Terms of Service.</p>
        </CardContent>
      </Card>
      </div>

    </section>

     <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 py-12 sm:py-16 px-6 sm:px-10 bg-gradient-to-r from-blue-600 to-indigo-700 max-w-full mx-0 relative z-10 shadow-inner">
        <StatItem number="350K+" label="Short Links Created" />
        <StatItem number="5M+" label="Clicks this Month" />
        <StatItem number="99.9%" label="Uptime Guarantee" />
        <StatItem number="100%" label="Free to Use" />
      </div>

    </>
  )
}