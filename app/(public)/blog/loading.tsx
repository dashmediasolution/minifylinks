import { Skeleton } from "@/components/ui/skeleton"

export default function BlogListLoading() {
  return (
    <div className="min-h-screen bg-white pt-20 px-6">
      
      {/* 1. Header Area */}
      <div className="sm:mb-10 text-center max-w-3xl mx-auto flex flex-col items-center">
         <Skeleton className="h-4 w-32 rounded-full mb-4" />
         <Skeleton className="h-10 sm:h-14 md:h-16 w-3/4 rounded-xl mb-6" />
         <div className="w-full space-y-2 mt-2 hidden sm:block">
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-4 w-5/6 max-w-xl mx-auto" />
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10 sm:pb-20 flex flex-col lg:flex-row gap-12">
        
        {/* 2. Sidebar Skeleton (Hidden on mobile to match responsive logic) */}
        <aside className="hidden lg:flex flex-col space-y-6 w-[280px] shrink-0">
           {/* Search Box Skeleton */}
           <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
             <Skeleton className="h-4 w-16" />
             <Skeleton className="h-12 w-full rounded-xl" />
           </div>
           
           {/* Category List Skeleton */}
           <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5">
             <div className="border-b border-slate-100 pb-4">
                <Skeleton className="h-4 w-20" />
             </div>
             <div className="flex flex-col gap-3">
                {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-8 w-full rounded-lg" />)}
             </div>
           </div>
        </aside>

        {/* 3. Main Content Area */}
        <div className="flex-1 space-y-10">
          
          {/* Featured Post Skeleton (Matches FeaturedBlogCard) */}
          <div className="flex flex-col bg-white rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-sm">
             <Skeleton className="w-full h-[200px] rounded-2xl shrink-0" />
             <div className="flex flex-col flex-1 py-4 md:py-6 space-y-5">
               <div className="flex gap-2">
                 <Skeleton className="h-6 w-20 rounded-xl" />
                 <Skeleton className="h-6 w-24 rounded-xl" />
               </div>
               <div className="space-y-3">
                 <Skeleton className="h-8 sm:h-10 w-full rounded-lg" />
                 <Skeleton className="h-8 sm:h-10 w-3/4 rounded-lg" />
               </div>
               <div className="space-y-2">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
               </div>
               <div className="mt-auto pt-6 flex items-center gap-3 border-t border-slate-100">
                 <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                 <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                 </div>
               </div>
             </div>
          </div>

          {/* Grid Area (Matches BlogCard) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col bg-white rounded-3xl border border-slate-100 p-3 shadow-sm h-full">
                    {/* Image */}
                    <Skeleton className="w-full aspect-[16/9] rounded-2xl shrink-0" />
                    <div className="flex flex-col flex-1 p-3 pt-5 gap-3">
                      {/* Meta */}
                      <div className="flex justify-between items-center mb-1">
                          <Skeleton className="h-5 w-16 rounded-lg" />
                          <Skeleton className="h-4 w-24" />
                      </div>
                      {/* Title & Excerpt */}
                      <Skeleton className="h-6 w-full rounded-md" />
                      <Skeleton className="h-6 w-2/3 rounded-md mb-2" />
                      <Skeleton className="h-4 w-full mt-1" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}