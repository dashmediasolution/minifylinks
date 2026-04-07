import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://minifylinks.com"),
  title: {
    default: "Free URL Shortener | MinifyLinks",
    template: "%s | MinifyLinks",
  },
  description: "Simplify your links, amplify your reach. A powerful, free tool to shrink long links.",
  keywords: ["url shortener", "link shortener", "free url shortener"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Free URL Shortener | MinifyLinks",
    description: "Simplify your links, amplify your reach. A powerful, free tool to shrink long links.",
    locale: "en_US",
    url: "https://minifylinks.com/",
    siteName: "MinifyLinks",
    images: [
      {
        url: "/logos/apple-touch-icon.png", // Or the path to a larger OG image if you have one
        width: 1200,
        height: 630,
        alt: "MinifyLinks Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Shortener | MinifyLinks",
    description: "Simplify your links, amplify your reach. A powerful, free tool to shrink long links.",
    site: "@MinifyLinks",
    creator: "@MinifyLinks",
    images: [
      {
        url: "/logos/apple-touch-icon.png",
        width: 1200,
        height: 630,
        alt: "MinifyLinks Logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/logos/favicon.ico" },
      { url: "/logos/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logos/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logos/favicon.ico",
    apple: "/logos/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}