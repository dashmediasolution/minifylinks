import { Metadata } from "next";
import ShortUrlClient from "@/components/home-page/ShortUrlClient";
import { FaqSection } from "@/components/FAQs/urlFAQ";
import { QRPlatformSection } from "@/components/QRComponent";
import { Globe, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { QrCode, BarChart3, Sparkles, ScanQrCode, Link2 } from "lucide-react";

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

const props = [
  {
    title: "Get 2x More Click-Through Rate with Custom Links",
    points: [
      ' Users trust clean links more than long strings of random letters.',
      'Turn any long link into a short URL with our custom alias feature.',
      'Clear links get higher click-through rates on social posts and emails.'

    ],
    image: "/images/QRImage.png",
    icon: <QrCode className="h-4 w-4 text-purple-600" />
  },
  {
    title: "Easily Identify What’s Effective and Create Professional Link Strategies",
    points: [
      'Add Google UTM parameters to your shortened links for analytics.',
      'Organize campaign links using tags, folders, and custom aliases.',
      'Develop a high-scale custom workflow for link shortening with MinifyLinks.'

    ],
    image: "/images/QRCodeImage.png",
    icon: <BarChart3 className="h-4 w-4 text-orange-500" />
  },
  {
    title: "Take Control of Shared Links to Boost Customer Targeting",
    points: [
      'Keep your links organized and easy to manage from one place.',
      'Custom URL shortening without making links generic and spammy - looking.',
      'Use link insights to understand your audience and improve campaigns.'

    ],
    image: "/images/UrlShortImage.png",
    icon: <Sparkles className="h-4 w-4 text-purple-600" />
  },
]

const cards = {
  heading: "MinifyLinks: Best URL Shortener",
  subheading: "Create fast, clean, and professional short URLs for websites, social media, or campaigns.",
  items: [
    {
      title: "Reliable URL Shortener",
      text: "Turn long URLs into short, clean, and shareable links in seconds.",
      icon: <Link2 />
    },
    {
      title: "Custom URL Alias",
      text: "Create personalized short links with memorable custom aliases for easy recognition.",
      icon: <Sparkles />
    },
    {
      title: "Secure Link Protection",
      text: "HTTPS destination support for all URLs. Protects your users from unsafe redirects.",
      icon: <QrCode />
    },
    {
      title: "Easy Link Sharing",
      text: "Use easy-to-use short URLs for sharing across websites, social media, etc.",
      icon: <ScanQrCode />
    },]
}

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

      <QRPlatformSection props={props} cards={cards} />

      <FaqSection />
    </div>
  );
}