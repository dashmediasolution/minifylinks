import Link from 'next/link'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ArrowUpRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { BlogPost } from "@/types/blog" // <--- Import the type

interface BlogCardProps {
  post: BlogPost // <--- Use the type here
  className?: string
  priority?: boolean;
}

export function BlogCard({ post, className,priority = false }: BlogCardProps) {
  return (
    <article className={cn("group flex flex-col bg-white rounded-3xl border border-slate-100 p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full focus:outline-none mb-4", className)}>
      {/* Image Container with Zoom Effect */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-slate-50 relative aspect-[16/9] shrink-0">
         {post.image ? (
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover aspect-[16/9] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
         ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
               <span className="font-bold text-3xl opacity-20">No Image</span>
            </div>
         )}
         
         {/* Overlay Icon */}
         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2.5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
            <ArrowUpRight className="h-4 w-4 text-blue-600" />
         </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 pt-5 gap-3">
        {/* Categories & Date Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
           <div className="flex flex-wrap gap-2">
             {post.categories && post.categories.length > 0 ? (
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               post.categories.slice(0, 2).map((cat: any, idx: number) => (
                 <Link key={idx} href={`/category/${cat.slug || cat}`}>
                   <Badge variant="secondary" className="font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg px-2.5 py-0.5 cursor-pointer transition-colors">
                     {cat.name || cat}
                   </Badge>
                 </Link>
               ))
             ) : (
               <span className="text-slate-400 italic">Uncategorized</span>
             )}
           </div>
           <div className="flex items-center font-medium">
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric', year: 'numeric' 
              })}
           </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1">
          {post.excerpt || "Click to read full article..."}
        </p>
      </div>
    </article>
  )
}