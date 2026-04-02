import { HeroSection } from "@/components/home-page/HeroSection";
import { HowItWorks } from "@/components/home-page/HowItWorks";
import { FeaturesBento } from "@/components/home-page/FeaturesBento";
import { FaqSection } from "@/components/home-page/FaqSection";
import { AbstractCtaBanner } from "@/components/home-page/CtaBanner";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free URL Shortener & Custom Links",
  description: "Turn long URLs into smart, branded short links with MinifyLinks. Track clicks, use custom aliases, and grow your reach with a fast, reliable, and free URL shortener.",
  alternates: {
    canonical: "https://minifylinks.com",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "MinifyLinks Inc.",
        "url": "https://minifylinks.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://minifylinks.com/logos/favicon-32x32.png"
        },
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "url": "https://minifylinks.com/",
        "name": "MinifyLinks",
        "description": "Free URL shortener tool to create short, trackable links with advanced analytics and secure redirection."
      },
      {
        "@type": "WebPage",
        "url": "https://minifylinks.com/",
        "name": "Free URL Shortener & Custom Links | MinifyLinks",
        "description": "MinifyLinks helps you shorten URLs, track clicks, and manage links with ease.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://minifylinks.com/images/minifylinks-shortener.webp"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://minifylinks.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "URL Shortener",
            "item": "https://minifylinks.com/"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "MinifyLinks URL Shortener",
        "operatingSystem": "All",
        "applicationCategory": "WebApplication",
        "url": "https://minifylinks.com/",
        "image": "https://minifylinks.com/images/minifylinks-shortener.webp",
        "description": "A free URL shortener that converts long links into short, secure, and trackable URLs.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "URL shortening",
          "Custom short links",
          "Link analytics",
          "Secure HTTPS encryption",
          "Global CDN fast redirects",
          "Link tracking",
          "Mobile optimized"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "MinifyLinks",
        "url": "https://minifylinks.com/",
        "image": "https://minifylinks.com/images/minifylinks-shortener.webp",
        "logo": "https://minifylinks.com/logos/favicon-32x32.png",
        "description": "MinifyLinks provides URL shortening services globally with fast, secure, and reliable infrastructure.",
        "areaServed": [
          "United States",
          "United Kingdom",
          "India",
          "Canada",
          "Australia",
          "Germany",
          "UAE",
          "Singapore",
          "Worldwide"
        ],
        "priceRange": "$0",
        "openingHours": "Mo-Su 00:00-23:59"
      },
      {
        "@type": "Service",
        "name": "URL Shortening Service",
        "provider": {
          "@type": "Organization",
          "name": "MinifyLinks"
        },
        "areaServed": "Worldwide",
        "serviceType": [
          "URL Shortener",
          "Custom Link Generator",
          "Link Tracking",
          "Analytics Reporting",
          "Secure Link Management"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is MinifyLinks completely free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, MinifyLinks is 100% free and allows unlimited link shortening."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a limit on how many links I can create?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you can create unlimited short links without restrictions."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to create an account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No account is required, but signing up unlocks advanced features."
            }
          },
          {
            "@type": "Question",
            "name": "Do my short links expire?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Links do not expire by default, but expiration can be set manually."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col ">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <HeroSection />

      {/* 3. Steps */}
      <HowItWorks />

      {/* 4. Features */}
      <FeaturesBento />

      {/* 5. FAQ */}
      <FaqSection />

      {/* 6. NEW CTA BANNER */}
      <AbstractCtaBanner />

    </div>
  );
}