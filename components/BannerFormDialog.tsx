'use client'

import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon } from "lucide-react"
import { uploadEditorImage } from '@/lib/cloudinary-helper'

type Inputs = {
  title: string
  description: string
  redirectTo: string
  image: FileList
}

interface BannerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateBannerDialog({ open, onOpenChange }: BannerFormDialogProps) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      redirectTo: "",
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

   const watchedImage = watch("image")

   useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0]
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

       return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [watchedImage])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      if (!data.image || !data.image[0]) {
        throw new Error("Please select an image file.")
      }

      const imageFile = data.image[0]
      const uploadFormData = new FormData()
      uploadFormData.append('file', imageFile)

      const uploadResult = await uploadEditorImage(uploadFormData)
      console.log(uploadResult)
      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || 'Cloudinary upload failed')
      }

      const payload = {
        title: data.title,
        description: data.description,
        redirectTo: data.redirectTo,
        image: uploadResult.url,
      }

      const response = await fetch('/api/admin/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData?.error || 'Failed to create banner')
      }

      reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setLoading(false)
    }
  }

 const handleCancel = () => {
     // Close the dialog modal
     onOpenChange(false)
  reset({
    title: "",
    description: "",
    redirectTo: "",  
    image: undefined as any  
  })
  
}
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] p-0 overflow-hidden rounded-3xl border-0 bg-white shadow-xl">
        
        <DialogHeader className="px-6 pt-4 pb-1 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900">Create New Banner</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Fill in the details below and upload an image from your computer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-2 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Banner Title</Label>
            <Input 
              id="title"
              placeholder="e.g., Fly to Europe from $299" 
              {...register("title", { required: "Title is required", maxLength: { value: 40, message: "Max length is 40 characters" } })}
              className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

           <div className="space-y-1.5">
            <Label htmlFor="image" className="text-sm font-semibold text-slate-700">Banner Background Image</Label>
            
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-slate-50 hover:bg-slate-100/70 transition-colors group min-h-[140px]">
              
              {previewUrl ? (
                 <div className="relative w-full aspect-[16/9] bg-slate-950 flex items-center justify-center">
                  <Image 
                    src={previewUrl} 
                    alt="Selected banner preview" 
                    fill 
                    className="object-contain"
                    unoptimized  
                  />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-xs font-medium">Click to change image</span>
                  </div>
                </div>
              ) : (
                 <div className="flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                  <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-500 mb-1 transition-colors" />
                  <span className="text-xs font-medium text-slate-600">Click to browse system files</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, or WebP</span>
                </div>
              )}

               <Input 
                id="image" 
                type="file"
                accept="image/*"
                {...register("image", { required: "An image file from your system is required" })}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
            </div>
            {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="redirectTo" className="text-sm font-semibold text-slate-700">Redirect Destination (CTA Link)</Label>
            <Input 
              id="redirectTo" 
              placeholder="/offers or https://..."
              {...register("redirectTo")} 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Short Subtitle / Description</Label>
            <Textarea 
              id="description" 
              placeholder="Write a brief subtext description targeting travel search deals..." 
              className="resize-none h-20"
              {...register("description")} 
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
            <Button type="button" variant="outline" className="rounded-full" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 min-w-[100px]" disabled={loading}>
              {loading ? "Saving..." : "Create Slide"}
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}