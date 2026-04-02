'use client'

import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Track the last pathname to close the menu when it changes without an effect
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setIsOpen(false);
    setPrevPathname(pathname);
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Blogs", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
  ];

  
  return (
    <>
      {/* FLOATING NAVBAR CONTAINER */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-4 px-4 pointer-events-none">
        <div className="flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 w-full max-w-4xl relative z-10 pointer-events-auto">
          
          {/* LOGO (Left) */}
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-semibold text-xl md:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">
                  MinifyLinks
                </span>
              </Link>
            </motion.div>
          </div>

          {/* DESKTOP NAV (Right) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={link.href} className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/#hero-section"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_10px_20px_-10px_rgba(37,99,235,0.6)] transition-all font-bold"
            >
              Get Started
            </Link>
          </motion.div>

          {/* MOBILE TOGGLE */}
          <motion.button className="md:hidden flex items-center text-gray-900" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>
            
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link href={link.href} className="text-xl text-gray-900 font-medium" onClick={toggleMenu}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  href="/#hero-section"
                  className="inline-flex items-center justify-center w-full px-5 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
