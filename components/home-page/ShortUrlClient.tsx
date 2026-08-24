"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UrlShortner from "@/components/home-page/UrlShortner";

export default function ShortUrlClient() {
  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.clear();

    if (!url) {
      toast.error("Please enter a URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          customUrl: customUrl.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Link processed successfully!");
        sessionStorage.setItem("latest_short_code", data.shortCode);
        sessionStorage.setItem("latest_original_url", url);
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
    <>
      {/* Hero Banner */}
      <section className="md:pt-16 pt-8 pb-12 px-6 w-full mx-auto text-center relative">
        <Badge
          variant="outline"
          className="mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600" />
          No Sign-Up Required
        </Badge>

        <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Create Custom Links Using <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-700">
            Our Powerful URL Shortener
          </span>
        </h1>
        <p className="mt-4 text-xs md:text-lg text-slate-600 max-w-2xl mx-auto">
          Create an immediate bond with your audience by using our free link
          shortener. It converts links into reliable web addresses that you can
          share easily, all through MinifyLinks.
        </p>
      </section>

      {/* Main Interactive Tool Card */}
      <section className="px-6 max-w-full md:max-w-[85%] mx-auto">
        <Card className="border-none rounded-2xl w-full overflow-hidden">
          <CardHeader className="bg-linear-to-r from-slate-50 border-2 rounded-2xl to-indigo-50/40 border-b border-slate-100 p-8">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <Link2 className="w-6 h-6" />
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                Custom Slugs
              </Badge>
            </div>
            <CardTitle className="text-lg md:text-2xl font-bold text-slate-900">
              Try the Best URL Shortener
            </CardTitle>
            <CardDescription className="text-slate-500 text-xs md:text-base">
              Enter your long URL and configure domain parameters below.
            </CardDescription>
          </CardHeader>
          <CardContent className="shadow-none px-0 flex gap-6 flex-col md:flex-row">
            <UrlShortner
              url={url}
              setUrl={setUrl}
              customUrl={customUrl}
              setCustomUrl={setCustomUrl}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}