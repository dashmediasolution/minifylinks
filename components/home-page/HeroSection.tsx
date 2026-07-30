'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Sparkles, Link2, QrCode } from 'lucide-react';
import UrlShortner from './UrlShortner';
import GenerateQRCode from './generateQRcode';



export function HeroSection() {
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
   const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'shortener' | 'qr'>('shortener');
  const [credit, setCredit] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent ) => {
    e.preventDefault();
    sessionStorage.clear()


    if (!url) {
      toast.error("Please enter a URL.");
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
        toast.success("Link processed successfully!");
if (typeof window !== 'undefined' && data?.usage !== undefined) {
          localStorage.setItem("credit", data.usage.toString());
          setCredit(data.usage);
        }
        sessionStorage.setItem('latest_short_code', data.shortCode);
        sessionStorage.setItem('latest_original_url', url);

        

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
    <>
      <section className="relative pt-24 sm:pt-32 pb-16 text-center px-4 sm:px-6 lg:px-8 overflow-hidden" id="hero-section">
        <div className="absolute  left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-blue-200/50 to-indigo-200/40 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Fast, Reliable & Free URL Shortener</span>
          </div>

          <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Shorten links, create QR codes, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-700">
              and expand your reach.
            </span>
          </h1>

          <p className="text-xs sm:text-md text-slate-600 max-w-2xl mx-auto font-normal">
            Minifylinks gives you total control over your short links with custom alias branding and instant QR code generation.
          </p>

          {/* Segmented Switcher */}
          <div className="flex items-center justify-center pt-3">
            <div className="relative inline-flex p-1.5 bg-slate-100/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('shortener')}
                className={`relative z-10 text-xs md:text-sm flex items-center gap-2 px-5 py-2.5 rounded-xl 
              font-semibold transition-all duration-300 select-none ${activeTab === 'shortener' ? 'text-blue-600 font-bold' :
                 'text-slate-500 hover:text-slate-800'
                  }`}
               >
                <Link2 className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'shortener' ? 'scale-110 text-blue-600' : 'text-slate-400'}`} />
                <span>Shorten Link</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('qr')}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 select-none ${activeTab === 'qr' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <QrCode className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'qr' ? 'scale-110 text-blue-600' : 'text-slate-400'}`} />
                <span>QR Studio</span>
              </button>

              <div
                className={`absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-md shadow-slate-200/80 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeTab === 'shortener'
                    ? 'left-1.5 w-[calc(50%-0.375rem)]'
                    : 'left-[calc(50%+0.1875rem)] w-[calc(50%-0.375rem)]'
                  }`}
              />
            </div>
          </div>
        </div>

        {/* Tab Views */}
        <div className="mt-6 flex justify-center items-center ">
          {activeTab === 'shortener' ? (
            
              <div className='w-full md:w-[85%]'>

                <UrlShortner
                  url={url}
                  setUrl={setUrl}
                  customUrl={customUrl}
                  setCustomUrl={setCustomUrl}
                  loading={loading}
                  handleSubmit={(e) => handleSubmit(e)}
                    credit={credit}
                  setCredit={setCredit}
                />
              </div>
          ) : (
            <GenerateQRCode/>
          )}
        </div>
      </section>

     
    </>
  );
}