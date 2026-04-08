import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, User, ImageIcon } from "lucide-react";
import { BlogPost } from "@/types/blog"; 

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col  bg-white rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 items-center ">
        
        {/* --- Image Area --- */}
      <Link href={`/blog/${post.slug}`} className="relative w-full h-[200px] overflow-hidden bg-slate-50 rounded-2xl shrink-0 block focus:outline-none">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover  group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
              <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
              <span className="text-sm font-bold opacity-20 uppercase">No Cover Image</span>
            </div>
          )}
          
          {/* 1. "Featured" Badge (Kept as layout anchor) */}
          <div className="absolute top-4 left-4">
             <Badge className="bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm">
               Featured
             </Badge>
          </div>

          {/* 2. NEW: Hover Overlay Icon (From BlogCard) */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2.5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
            <ArrowUpRight className="h-5 w-5 text-blue-600" />
          </div>
      </Link>

        {/* --- Content Area --- */}
      <div className="flex flex-col flex-1 py-2 md:py-6 space-y-5">
          
          {/* 3. NEW: Category Badges (From BlogCard) */}
          <div className="flex flex-wrap gap-2">
             {post.categories && post.categories.length > 0 ? (
               post.categories.slice(0, 3).map((cat, idx) => (
                 <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl px-3 py-1 text-sm font-medium transition-colors border-none">
                   {cat}
                 </Badge>
               ))
             ) : (
               <span className="text-slate-400 italic text-sm">Uncategorized</span>
             )}
          </div>

          <div className="space-y-4">
            <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
              {post.title}
            </h3>
            </Link>
            <p className="text-slate-500 text-base sm:text-lg line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Metadata Footer (Kept Original Layout) */}
          <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                 <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">MinifyLinks Team</span>
                <span className="text-xs text-slate-500 font-medium">
                   {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>
    </article>
  );
}