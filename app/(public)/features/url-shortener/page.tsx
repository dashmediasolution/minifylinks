"use client";

import { useState } from "react";
 import { 
  Link2, 
  Sparkles,
  Globe, 
  BarChart3, 
  ShieldCheck, 
  Play, 

} from "lucide-react";
import { FaqSection } from "@/components/home-page/FaqSection";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UrlShortner from "@/components/home-page/UrlShortner";
import { toast } from "sonner";
import {QRPlatformSection} from "@/components/QRComponent";

import { useRouter } from "next/navigation";
export default function ShortUrlPage() {
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
   const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'shortener' | 'qr'>('shortener');

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
    <div className="pb-24 pt-20">
      {/* Hero Banner */}
      <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center relative">
        <Badge variant="outline" className="mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600" />
          Enterprise Link Infrastructure
        </Badge>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
          Transform long URLs into <br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            high-converting brand assets
          </span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Create custom branded short links with UTM tagging, deep click attribution analytics.
        </p>
      </section>

      {/* Main Interactive Tool Card */}
      <section className="px-6 max-w-5xl mx-auto">
        <Card className=" border-none rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 border-2 rounded-2xl to-indigo-50/40 border-b border-slate-100 p-8">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <Link2 className="w-6 h-6" />
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Custom Slugs </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Create Shortened Link</CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Enter your long URL and configure domain parameters below.
            </CardDescription>
          </CardHeader>
          <CardContent className="shadow-none">
          <UrlShortner    
              url={url}
              setUrl={setUrl}
              customUrl={customUrl}
              setCustomUrl={setCustomUrl}
              loading={loading}
              handleSubmit={(e) => handleSubmit(e)}/>
             
          </CardContent>
        </Card>
      </section>

 

      {/* URL Features Grid */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Built for Modern Link Management</h2>
          <p className="text-slate-600 mt-2">All features included in the Link Shortener engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white p-6">
            <Globe className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">Custom Branded Domains</h3>
            <p className="text-sm text-slate-600 mt-2">Connect your domain (e.g., `link.brand.com`) for higher brand trust.</p>
          </Card>

          <Card className="border-slate-200 bg-white p-6">
            <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">Malware Protection</h3>
            <p className="text-sm text-slate-600 mt-2">Automatic link scanning blocks phishing and unsafe destination URLs.</p>
          </Card>

          <Card className="border-slate-200 bg-white p-6">
            <BarChart3 className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">Real-Time Click Analytics</h3>
            <p className="text-sm text-slate-600 mt-2">Inspect click logs, geographical sources, and referrer headers immediately.</p>
          </Card>
        </div>
      </section>
      <QRPlatformSection/>
      <FaqSection/>
     </div>
  );
}