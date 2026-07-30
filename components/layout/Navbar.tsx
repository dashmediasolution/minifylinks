'use client'

import Link from "next/link";
import { Menu, X, Link2, QrCode, Sliders, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(false);
    setIsFeaturesOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const featureItems = [
    {
      title: "URL Shortener",
      href: "/features/url-shortener",
      description: "Branded short links & custom aliases.",
      icon: Link2,
    },
    {
      title: "Custom QR Studio",
      href: "/features/customize-qr",
      description: "Custom colors, shapes & logo overlays.",
      icon: Sliders,
    },
    {
      title: "Quick QR Generator",
      href: "/features/qr-generator",
      description: "Instant SVG/PNG dynamic QR codes.",
      icon: QrCode,
    },
  ];

  if (!mounted) return <div className="h-16 w-full" />;

  return (
    <>
      <header className="fixed top-0 left-0 w-screen right-0 z-50 flex justify-center  py-3 px-4 pointer-events-none">
        <div className="flex items-center justify-between px-6 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-slate-100 w-full max-w-4xl relative z-10 pointer-events-auto">

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logos/minifylinks-logo.svg"
              alt="MinifyLinks Logo"
              width={36}
              height={36}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-2">

            {/* FEATURES DROPDOWN CONTAINER */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-700 group-hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                Features
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {/* DROPDOWN MENU PANEL (EXPLICIT 540px WIDTH) */}
              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-30 -translate-x-1/2 top-full pt-2 w-[540px] z-50"
                  >
                    <div className="p-3 bg-white rounded-2xl shadow-xl border border-slate-200/80 grid grid-cols-3 gap-2">
                      {featureItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex flex-col p-3 rounded-xl hover:bg-blue-50/80 transition-colors group text-left"
                          >
                            <div className="p-2 w-fit rounded-lg bg-blue-100/60 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                              {item.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className="px-3 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Blogs
            </Link>

            <Link href="/faqs" className="px-3 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors font-medium">
              FAQs
            </Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/features/url-shortener"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-xs"
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            className="md:hidden p-1.5 text-slate-800 hover:text-blue-600"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-20 px-6 md:hidden overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              type="button"
              className="absolute top-5 right-5 p-2 text-slate-700"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col space-y-6 pb-12">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Features</span>
                <div className="space-y-2 pl-1">
                  {featureItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center gap-3 p-2.5 rounded-xl text-slate-800 hover:bg-slate-50 font-semibold"
                      >
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm">{item.title}</p>
                          <p className="text-xs font-normal text-slate-400">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <Link href="/blog" className="text-base text-slate-800 font-semibold" onClick={toggleMenu}>
                Blogs
              </Link>
              <Link href="/faqs" className="text-base text-slate-800 font-semibold" onClick={toggleMenu}>
                FAQs
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}