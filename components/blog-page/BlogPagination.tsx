'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    // Scroll to top of results when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`/blog?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-16 pt-10 border-t border-slate-100">
      <Button
        variant="outline"
        size="lg"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex items-center gap-2 pl-4 pr-5 rounded-full shadow-sm border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-semibold"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <span className="text-sm font-bold text-slate-500 px-2">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="lg"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex items-center gap-2 pl-5 pr-4 rounded-full shadow-sm border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-semibold"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}