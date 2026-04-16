'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, AlertTriangle } from 'lucide-react'

interface DeleteCategoryDialogProps {
  categoryId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteCategoryDialog({ categoryId, onClose, onSuccess }: DeleteCategoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!categoryId) return
    setIsDeleting(true)

    try {
      const res = await fetch(`/api/category?id=${categoryId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Category deleted successfully!')
        onSuccess()
        onClose()
      } else {
        // Safely check if the response is JSON before parsing
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await res.json();
          toast.error(errorData.error || 'Failed to delete category.');
        } else {
          toast.error(`Server Error: ${res.status}. The API route could not be found.`);
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={!!categoryId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><AlertTriangle className="text-red-500" /> Are you sure?</DialogTitle><DialogDescription>This action cannot be undone. This will permanently delete the category. Posts will be un-categorized.</DialogDescription></DialogHeader>
        <DialogFooter className="sm:justify-end"><Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>Cancel</Button><Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>{isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}