import Link from "next/link";
import { Twitter, Facebook, Instagram, Youtube, Pin, MessageCircle, BookOpen, Rss } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blog" },
    { name: "Features", href: "/#features" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    {name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        
        {/* TOP SECTION: Aligned Start (Left) on Mobile, Center on Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* LEFT: Brand */}
          <div className="flex flex-col items-start gap-2">
            <Link href="/" aria-label="Home page" className="flex items-center gap-2 group">
              <span className="font-black text-2xl tracking-tight text-white">
                MinifyLinks
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-medium mt-1">
              The Best URL Shortener to Boost Your Reach.
            </p>
          </div>

          {/* RIGHT: Navigation Links (Vertical List on Mobile) */}
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                aria-label={`Know more about ${link.name}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* BOTTOM: Divider & Socials */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-slate-500 font-medium">
            &copy; 2026 MinifyLinks Inc. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-6 md:gap-4">
            <a href="https://www.facebook.com/minifylinks" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/minifylink/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://x.com/Minifylink" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://www.pinterest.com/minifylink/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Pin className="h-4 w-4" />
            </a>
            <a href="https://www.tumblr.com/minifylink" target="_blank" rel="noopener noreferrer" aria-label="Tumblr" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M390 32H120c-49.19 0-88 38.81-88 88v270c0 49.19 38.81 90 88 90h270c49.19 0 90-40.81 90-90V120c0-49.19-40.81-88-90-88m-54 364h-52c-42.51 0-72-23.68-72-76v-80h-36v-48c42.51-11 57.95-48.32 60-80h44v72h52v56h-52l-.39 70.51c0 21.87 11 29.43 28.62 29.43L336 340Z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Minifylink" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="https://www.quora.com/profile/Minify-Links" target="_blank" rel="noopener noreferrer" aria-label="Quora" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="https://medium.com/@minifylink" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <BookOpen className="h-4 w-4" />
            </a>
            <a href="https://minifylinkss.blogspot.com/" target="_blank" rel="noopener noreferrer" aria-label="Blogspot" className="text-slate-400 hover:text-white hover:-translate-y-1 transform transition-all">
              <Rss className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}