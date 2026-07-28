'use client'

import Link from "next/link";
import { Menu, X, Link2, QrCode, Sliders, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import UrlShortner from "../home-page/UrlShortner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useTheme } from 'next-themes'
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()  // Track pathname changes to close mobile menu
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setIsOpen(false);
    setPrevPathname(pathname);
  }
  useEffect(() => {
    setMounted(true)
  }, [])
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
  if (!mounted) {
    return <button className="p-2 border rounded-md opacity-0">Toggle</button>
  }
  return (
    <>
      {/* FLOATING NAVBAR CONTAINER */}
      <div className="fixed top-0 left-0 right-0  z-50 flex justify-center w-full py-4 px-4 pointer-events-none">
        <div className="flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 w-full max-w-4xl relative z-10 pointer-events-auto">

          {/* LOGO (Left) */}
          <Link href="/">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logos/minifylinks-logo.svg"
                  alt="MinifyLinks Logo"
                  width={40}
                  height={40}
                  priority
                />
              </motion.div>
            </div>
          </Link>

          {/* DESKTOP NAV (Center/Right) */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* SHADCN DROPDOWN FOR FEATURES */}
            <NavigationMenu className="relative">
              <NavigationMenuList>
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className="text-sm text-gray-900 hover:text-blue-600 font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Features
                  </NavigationMenuTrigger>

                  {/* DROPDOWN MENU CENTERED */}
                  <NavigationMenuContent className="left-1/2 -translate-x-1/2 relative right-20 !w-[600px]">
                    <ul className="grid grid-cols-3 w-[600px]   gap-3 p-4 bg-white rounded-2xl    border-gray-100">
                      {featureItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="flex flex-col h-full p-3 rounded-xl hover:bg-blue-50/70 transition-colors group text-left"
                              >
                                <div className="p-2 w-fit rounded-lg bg-blue-100/60 text-blue-600   group-hover:text-white transition-colors mb-2">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {item.title}
                                </div>
                                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Blogs Link */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/blog" className="px-3 py-2 text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                Blogs
              </Link>
            </motion.div>

            {/* FAQs Link */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/faqs" className="px-3 py-2 text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                FAQs
              </Link>
            </motion.div>
          </nav>

          {/* DESKTOP CTA BUTTON */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full w-9 h-9 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
           >
             <Sun className="h-[1.2rem] w-[1.2rem] text-blue-500 transition-all duration-300 ease-in-out scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />

             <Moon className="absolute h-[1.2rem] w-[1.2rem] text-zinc-900 dark:text-zinc-100 transition-all duration-300 ease-in-out scale-0 rotate-90 dark:scale-100 dark:rotate-0" />

            <span className="sr-only">Toggle theme</span>
          </Button> */}
          <div></div>
          {/* MOBILE TOGGLE */}
          <motion.button
            className="md:hidden flex items-center text-gray-900"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>

            <div className="flex flex-col space-y-6 pb-12">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Features</span>
                <div className="space-y-2 pl-2">
                  {featureItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center gap-3 p-2 rounded-xl text-gray-900 hover:text-blue-600 font-semibold"
                      >
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <Link href="/blog" className="text-lg text-gray-900 font-medium" onClick={toggleMenu}>
                Blogs
              </Link>

              <Link href="/faqs" className="text-lg text-gray-900 font-medium" onClick={toggleMenu}>
                FAQs
              </Link>

              <div className="pt-4">
                <Link
                  href="/url-shortener"
                  className="inline-flex items-center justify-center w-full px-5 py-3.5 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}