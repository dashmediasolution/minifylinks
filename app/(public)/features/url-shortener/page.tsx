import { Metadata } from "next";
import ShortUrlClient from "@/components/home-page/ShortUrlClient";
import { FaqSection } from "@/components/home-page/FaqSection";
import { QRPlatformSection } from "@/components/QRComponent";
import { Globe, ShieldCheck, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free URL Shortener: Create Custom Links Easily | MinifyLinks",
  description:
    "Shorten links in seconds with MinifyLinks, the best free URL shortener. Create custom branded short URLs and QR codes instantly with no sign-up required.",
  keywords: [
    "URL shortener",
    "Link Shortener",
    "Free Link Shortener",
    "Shorten URL",
    "Shorten Link",
    "Short URL",
    "How to Shorten URL",
    "Shorten URL for Social Media",
    "Best URL Shortener",
  ],
  applicationName: "MinifyLinks",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShortUrlPage() {
  return (
    <div className="pb-24 pt-20">
      {/* Interactive Tool & Hero */}
      <ShortUrlClient />

      {/* URL Features Grid */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Built for Modern Link Management
          </h2>
          <p className="text-slate-600 mt-2">
            All features included in the Link Shortener engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white p-6">
            <Globe className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">
              Enter Your Long Web Address
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Paste the long URL you want to shorten for social media or a
              campaign into the URL field.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6">
            <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">
              Customize Your Link with the Back Half
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Add a custom alias to create a short, memorable URL that matches
              your brand or campaign.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6">
            <BarChart3 className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg text-slate-900">
              Create & Share Through MinifyLinks
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Click Shorten URL to generate your link, then copy and share it
              anywhere you need.
            </p>
          </Card>
        </div>
      </section>

      <QRPlatformSection />
      <FaqSection />
    </div>
  );
}