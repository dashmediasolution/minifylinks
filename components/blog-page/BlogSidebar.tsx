'use client'

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce"; 

interface BlogSidebarProps {
  categories: string[];
}

export function BlogSidebar({ categories }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSearch = searchParams.get('search') || '';
  
  let activeCategory = 'All';
  if (pathname.startsWith('/blog/category/')) {
    const slug = decodeURIComponent(pathname.split('/blog/category/')[1]);
    activeCategory = categories.find(cat => cat.toLowerCase().replace(/\s+/g, '-') === slug) || 'All';
  } else if (searchParams.get('category')) {
    activeCategory = searchParams.get('category') || 'All';
  }

  // Initialize state directly from URL to prevent "flicker" clearing
  const [text, setText] = useState(currentSearch);
  const [query] = useDebounce(text, 500); 

  // --- SYNC 1: Keep Input Box Updated if URL Changes Externally ---
  // (e.g. User clicks Back button, or "Clear All")
  useEffect(() => {
    if (currentSearch !== text) {
       setText(currentSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]); 

  // --- SYNC 2: Push Changes to URL ---
  useEffect(() => {
    // Logic: Only update URL if the DEBOUNCED query is different from URL
    if (query === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    // Always reset to Page 1 on search change
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [query, router, searchParams, currentSearch, pathname]);


  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page'); // Reset page
    params.delete('category'); // Clear old param if present

    if (category === 'All') {
      router.push(`/blog?${params.toString()}`, { scroll: false });
    } else {
      const slug = category.toLowerCase().replace(/\s+/g, '-');
      router.push(`/category/${slug}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col space-y-6 w-[280px] shrink-0 sticky top-24 h-fit">
      
      {/* Search Box */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600" /> Search
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search article..." 
            className="pl-10 py-5 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all rounded-xl"
          />
          {text && (
            <button 
                onClick={() => setText('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1 rounded-md transition-colors"
            >
                <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Categories</h4>
            {(activeCategory !== 'All' || text) && (
                <button 
                    onClick={() => {
                      setText('');
                      router.push('/blog'); 
                    }}
                    className="text-[10px] text-red-500 hover:underline font-medium"
                >
                    Clear All
                </button>
            )}
        </div>

        <nav className="flex flex-col gap-1.5">
          {categories.map((cat) => {
             const isActive = activeCategory === cat || (cat === 'All' && !activeCategory);
             
             return (
                <button 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize flex justify-between items-center ${
                    isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                </button>
             );
          })}
        </nav>
      </div>
    </aside>
  );
}