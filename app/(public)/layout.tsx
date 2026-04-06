import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar"; // Assuming you have this
import { Footer } from "@/components/layout/Footer"; // Assuming you have this
import Script from "next/script";

export const metadata: Metadata = {
  verification: {
    google: "X37qC0cyl0pVnqHXob64N9G16lfmqDM9s_tkOWwgch4",
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "/images/minifylinks-shortener.webp",
        width: 1200,
        height: 630,
        alt: "MinifyLinks - Best URL Shortener",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/minifylinks-shortener.webp"],
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M8HDJ8P9');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M8HDJ8P9"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* 1. Navbar spans full width */}
      <Navbar />

      {/* 2. Main Layout Container */}
      {/* max-w-[1920px] ensures the site doesn't stretch infinitely on 4k screens */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto flex justify-center">

        {/* --- MAIN CONTENT CENTER --- */}
        {/* flex-1 allows it to take remaining space.*/}
        <main className="flex-1 w-full min-h-screen pt-10 md:pt-15">
          {children}
        </main>
      </div>

      {/* 3. Footer spans full width */}
      <Footer />
    </>
  );
}