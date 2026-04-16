'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'

export interface CategoryData {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  keywords?: string | null;
  postCount?: number;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit: CategoryData | null;
  onSuccess: () => void;
}

export function CategoryFormDialog({ open, onOpenChange, categoryToEdit, onSuccess }: CategoryFormDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name)
      setDescription(categoryToEdit.description || '')
      setKeywords(categoryToEdit.keywords || '')
    } else {
      setName('')
      setDescription('')
      setKeywords('')
    }
  }, [categoryToEdit, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload: {
      id?: string;
      name: string;
      description: string;
      keywords: string;
    } = { name, description, keywords }

    if (categoryToEdit && categoryToEdit.id) {
      payload.id = categoryToEdit.id
    }
    
    const url = '/api/category'
    const method = categoryToEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(`Category ${categoryToEdit ? 'updated' : 'created'} successfully!`)
        onSuccess()
        onOpenChange(false)
      } else {
        // Safely check if the response is JSON before parsing
        const contentType = res.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await res.json()
          toast.error(errorData.error || `Failed to ${categoryToEdit ? 'update' : 'create'} category.`)
        } else {
          toast.error(`Server Error: ${res.status}. The API route could not be found.`)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{categoryToEdit ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <DialogDescription>
            {categoryToEdit ? 'Update the details of this category.' : 'Add a new category to organize your blog posts.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div><Label htmlFor="description">Description</Label><Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description of the category." /></div>
            <div><Label htmlFor="keywords">Keywords</Label><Textarea id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Enter comma-separated keywords..." /></div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{categoryToEdit ? 'Save Changes' : 'Create Category'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}