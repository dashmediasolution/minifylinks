import { Skeleton } from "@/components/ui/skeleton"

export default function SingleBlogLoading() {
  return (
    <main className="bg-white min-h-screen">
      <article className="py-12 sm:py-16">
        
        {/* Post Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="flex flex-wrap gap-3 justify-center mb-4">
             <Skeleton className="h-6 w-20 rounded-lg" />
             <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-10 sm:h-12 lg:h-14 w-full mx-auto mb-3" />
          <Skeleton className="h-10 sm:h-12 lg:h-14 w-3/4 mx-auto" />
          
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
               <Skeleton className="h-6 w-6 rounded-full" />
               <Skeleton className="h-4 w-32" />
            </div>
            <span className="hidden sm:block text-slate-200">•</span>
            <div className="flex items-center gap-2">
               <Skeleton className="h-4 w-4 rounded-full" />
               <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
           <Skeleton className="w-full aspect-[16/9] rounded-2xl lg:rounded-3xl shadow-lg" />
        </div>

        {/* Post Body & Sidebars */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar: Share Widget (Sticky) */}
          <aside className="hidden lg:block w-20 shrink-0">
            <div className="sticky top-28 flex flex-col gap-3 items-center">
              <Skeleton className="h-3 w-12 mb-2" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-11/12" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-4/5" />
             
             <div className="pt-8 pb-4">
                <Skeleton className="h-8 w-1/2 mb-6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
             </div>
          </div>

          {/* Right Sidebar: Related Posts (Sticky) */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="space-y-6">
                <Skeleton className="h-6 w-32 border-b pb-2" />
                <div className="flex flex-col gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
                      <div className="flex flex-col gap-2 flex-1 pt-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </article>
    </main>
  )
}