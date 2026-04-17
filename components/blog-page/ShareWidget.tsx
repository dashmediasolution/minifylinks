'use client'

import { Check, Copy, Facebook, Linkedin, Mail, Share, Share2 } from "lucide-react"
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

  const openPopup = (shareUrl: string) => {
    if (!url) return;
    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
  }

  const shareOptions = [
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      colorClass: 'hover:bg-black hover:text-white hover:border-black',
      action: () => openPopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      colorClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
      action: () => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      colorClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
      action: () => openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      colorClass: 'hover:bg-slate-600 hover:text-white hover:border-slate-600',
      action: () => {
        if (url) window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_self');
      }
    }
  ]

  return (
    <div className="flex flex-col items-start lg:items-center w-full">
      {/* Mobile Heading */}
      <h3 className="font-semibold text-gray-900 text-md sm:text-lg border-b pb-2 lg:hidden">
        <Share className="w-4 h-4 text-blue-600" /> Share
      </h3>
      
      {/* Desktop Heading */}
      <span className="font-semibold text-gray-900 text-md sm:text-lg pb-2 hidden lg:block mb-4">
        Share
      </span>
      
      <div className="flex flex-row lg:flex-col flex-wrap gap-3 w-full lg:w-auto">
        {shareOptions.map((option) => (
          <button
            key={option.name}
            onClick={option.action}
            disabled={!isMounted}
            className={`w-11 h-11 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-1 lg:hover:-translate-y-0.5 ${option.colorClass} disabled:opacity-50 disabled:hover:-translate-y-0`}
            title={`Share on ${option.name}`}
            aria-label={`Share on ${option.name}`}
          >
            {option.icon}
          </button>
        ))}

        <div className="w-px h-6 lg:w-10 lg:h-px bg-slate-200 my-auto lg:my-2 hidden sm:block lg:block" />

        {/* Mobile Full-width Copy Button */}
        <button
          onClick={copyToClipboard}
          disabled={!isMounted}
          className={`lg:hidden flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-50`}
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {/* Desktop Icon Copy Button */}
        <button
          onClick={copyToClipboard}
          disabled={!isMounted}
          className={`hidden lg:flex w-10 h-10 rounded-full items-center justify-center bg-slate-50 border border-slate-100 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-50 disabled:hover:-translate-y-0`}
          title="Copy link"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}