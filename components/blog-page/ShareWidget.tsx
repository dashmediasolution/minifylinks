'use client'

import { Check, Copy, Facebook, Instagram, Pin, Youtube, MessageCircle, BookOpen, Rss, Share2 } from "lucide-react"
import { useState, useSyncExternalStore } from "react"
import { toast } from "sonner" 

const emptySubscribe = () => () => {}

interface ShareWidgetProps {
  title: string;
  slug: string;
}

export function ShareWidget({ title, slug }: ShareWidgetProps) {
  const [copied, setCopied] = useState(false)

  // Safely check if mounted to avoid hydration mismatch without triggering effect cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const url = isMounted ? window.location.href : ''

  const shareFacebook = () => {
    if (!url) return;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const shareX = () => {
    if (!url) return;
    const text = encodeURIComponent(title);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const sharePinterest = () => {
    if (!url) return;
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const shareTumblr = () => {
    if (!url) return;
    const shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const shareBlogger = () => {
    if (!url) return;
    const shareUrl = `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(url)}&n=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const handleFallbackShare = () => {
    copyToClipboard();
  }

  const copyToClipboard = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }

  return (
    <div className=" rounded-3xl p-6 sm:p-8">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
        <Share2 className="w-4 h-4 text-blue-600" /> Share Article
      </h3>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Instagram */}
        <button onClick={handleFallbackShare} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#E1306C] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Instagram">
          <Instagram className="w-5 h-5" />
        </button>

        {/* Facebook */}
        <button onClick={shareFacebook} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#1877F2] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Facebook">
          <Facebook className="w-5 h-5" />
        </button>

        {/* X / Twitter */}
        <button onClick={shareX} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white transition-all duration-300  hover:-translate-y-1" title="X (Twitter)">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        {/* Pinterest */}
        <button onClick={sharePinterest} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#E60023] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Pinterest">
          <Pin className="w-5 h-5" />
        </button>

        {/* Tumblr */}
        <button onClick={shareTumblr} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#36465D] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Tumblr">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 512 512">
            <path d="M390 32H120c-49.19 0-88 38.81-88 88v270c0 49.19 38.81 90 88 90h270c49.19 0 90-40.81 90-90V120c0-49.19-40.81-88-90-88m-54 364h-52c-42.51 0-72-23.68-72-76v-80h-36v-48c42.51-11 57.95-48.32 60-80h44v72h52v56h-52l-.39 70.51c0 21.87 11 29.43 28.62 29.43L336 340Z"/>
          </svg>
        </button>

        {/* YouTube */}
        <button onClick={handleFallbackShare} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#FF0000] hover:text-white transition-all duration-300  hover:-translate-y-1" title="YouTube">
          <Youtube className="w-5 h-5" />
        </button>

        {/* Quora */}
        <button onClick={handleFallbackShare} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#B92B27] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Quora">
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Medium */}
        <button onClick={handleFallbackShare} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white transition-all duration-300  hover:-translate-y-1" title="Medium">
          <BookOpen className="w-5 h-5" />
        </button>

        {/* Blogspot */}
        <button onClick={shareBlogger} className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-[#F57D00] hover:text-white transition-all duration-300  hover:-translate-y-1" title="Blogspot">
          <Rss className="w-5 h-5" />
        </button>
        
        {!isMounted && (
          <button disabled className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 text-slate-300 animate-pulse">
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="pt-6">
        <button 
          onClick={copyToClipboard} 
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all duration-300  hover:shadow active:scale-[0.98]"
        >
          {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          {copied ? "Link Copied!" : "Copy Article Link"}
        </button>
      </div>
    </div>
  )
}