
import {
  Palette,
  ImageIcon,
  Focus,
  Grid,
  ShieldCheck,
  FileCode,
} from "lucide-react";
import GenerateQRCode from "@/components/home-page/generateQRcode";
import { Card, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaqSection } from "@/components/FAQs/QRStudioFAQ";
import { QRPlatformSection } from "@/components/QRComponent";
import { Metadata } from "next";
import { QrCode, BarChart3, Sparkles, ScanQrCode, Link2 } from "lucide-react";
import TestimonialSection from "@/components/Testimonial";
export const metadata: Metadata = {
  title: " Free QR Code Generator with Logo | Custom QR by MinifyLinks",

  description: "Create free custom QR Codes online with logos, colors, patterns, and corner styles. No signup. Generate branded QR Codes instantly with unlimited downloads.",

  keywords: [
    " QR Code Generator with Logo",
    "Create QR Code",
    "Branded QR Code Generators",
    "unlimited free QR Codes",
    "Mobile-Friendly QR Codes",

  ],

  applicationName: "MinifyLinks",

  robots: {
    index: true,
    follow: true,
  },
};
export default function CustomizeQrPage() {
  const reviews = [
    {
      id: 1,
      initials: "SM",
      quote: "The UI was good, and I can constantly see a live preview of my QR and customize details according to that. The QR works well, and it features my logo in the center, which looks cool while scanning.",
      author: "Sophia Martinez",
      role: "E-commerce Store Owner, Craft & Code"
    },
    {
      id: 2,
      initials: "ER",
      quote: "The website does exactly what it says, which is generate unlimited free QR Codes. There was literally no login and no hidden paywall, only easy generation with lots of useful customization elements",
      author: "Elena Rostova",
      role: "Marketing Manager"
    },
    {
      id: 3,
      initials: "LW",
      quote: "It was really nice and simple to customize, and it provides professional looking results. I created a QR code for my café feedback form, and it was worth adding because it showed me lots of genuine reviews.",
      author: "Lucas Wright",
      role: "Owner, Cafe Owner"
    }
  ];

  const props = [
    {
      title: "Design Custom QR Codes That Match Your Brand & Inspire Instant Action",
      points: [
        'Unlimited color combinations.',
        'Custom eye & corner styles.',
        'Logo embedding with smart spacing.'

      ],
      image: "/images/QRImage.png",
      icon: <QrCode className="h-4 w-4 text-purple-600" />
    },
    {
      title: "Created for Fast & Reliable Scanning, Ready for Your Audience Interactions",
      points: [
        'Print-ready quality QR Codes.',
        'Crystal-clear downloads in PNG format.',
        'Fast recognition with mobile-friendly scanning.'


      ],
      image: "/images/QRCodeImage.png",
      icon: <BarChart3 className="h-4 w-4 text-orange-500" />
    },
    {
      title: "Use Memorable QR Codes for Branded Experiences on Every Platform",
      points: [
        'Generate short links & QR Codes together',
        'Custom QR for social media, websites, and campaigns',
        'Instantly redirect users with lightning-fast cloud routing.'


      ],
      image: "/images/UrlShortImage.png",
      icon: <Sparkles className="h-4 w-4 text-purple-600" />
    },
  ]

  const cards = {
    heading: "How to Use Custom QR Studio",
    subheading: "Design and edit all QR Codes via MinifyLinks and engage with your audience effortlessly.",
    items: [
      {
        title: "Enter Your Destination",
        text: "Copy and paste your landing page URL into the destination field.",
        icon: <Link2 />
      },
      {
        title: "Customize QR Codes",
        text: "Personalize your QR with elements like color, style, and logo.",
        icon: <Sparkles />
      },
      {
        title: "Download Custom QR",
        text: "Once everything is finalized, click the Download Custom QR button.",
        icon: <QrCode />
      },
      {
        title: "Share Across Platforms",
        text: "Use new QR code in marketing and engage better with your audience.",
        icon: <ScanQrCode />
      },]
  }

  return (
    <div className="bg-slate-50 pt-30 md:pt-30 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <section className=" pb-12 px-6 max-w-5xl mx-auto text-center relative z-10">
        <Badge variant="outline" className="mb-6 py-1.5 px-4 border-indigo-200 bg-indigo-50/80 text-indigo-700 font-medium rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-600" />
          QR Code Generator
        </Badge>


        <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Create Customizable <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-700">
            QR Codes with No Login

          </span>
        </h1>
        <p className="mt-4 text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generate QR Codes using MinifyLinks’ Custom QR Studio in seconds and share them online with your audience instantly across all
          social media platforms and promotional materials—digital as well as print.        </p>
      </section>

      <section className="px-6">
        <GenerateQRCode />
      </section>

      <section className="mt-24 px-6 max-w-7xl mx-auto mb-18">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="border-slate-300 text-slate-600 mb-3">Our QR Studio Feature</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Create QR Codes for ROI-Driven Campaigns
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Rethink the way you reach, share, and overall engage with your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pick Your Brand Colors</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Customize QR codes to match your brand colors and design. This feature helps you add your signature to all your ads, packaging, and print.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
              <Focus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pattern & Corner Styles</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Replace standard design with patterns like dots, rounded, and squares. This improves your QR's visual appeal without sacrificing speed or limits.             </p>
          </Card>

          {/* Feature 3 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Grid className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Use Your Own Logo</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Use official brand logos, product badges, icons, or images straight to the center of the QR codes to establish instant trust and drive more scans.             </p>
          </Card>

          {/* Feature 4 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600 mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Mobile-Optimized QR Codes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our responsive QR code ensures that any landing page, digital menu, or content linked automatically resizes and displays cleanly on phone screens.             </p>
          </Card>

          {/* Feature 5 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Super Fast Loading Time</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We support faster load times by shortening destination URLs and using static QR instead of heavy redirects or full-page optimization for mobile.
            </p>
          </Card>


          {/* Feature 6 */}
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Edit QR with Live Preview</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Check changes in real time and update the code graphic instantly, including color, style, and logo. Spot mistakes and test scan right away.
            </p>
          </Card>



        </div>
      </section>


      <QRPlatformSection props={props} cards={cards} />
      <TestimonialSection testimonials={reviews} />
      <FaqSection />

    </div>
  );
}