'use client'

import { Pencil, Trash2, Plus, Loader2, ImageIcon, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import CreateBannerDialog from '@/components/BannerFormDialog'

interface BannerItem {
  id: string
  title: string
  description: string
  image: string
  redirectTo: string
  createdAt: string
}

export default function Banner() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [banners, setBanners] = useState<BannerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

   const fetchBanners = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/banner')
      if (!res.ok) throw new Error('Failed to load banners')
      const data = await res.json()
      setBanners(data)
    } catch (err) {
      console.error("Failed to load banners:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

   const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner and its media asset?")) return

    try {
      setDeletingId(id)
      const res = await fetch(`/api/admin/banner/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Deletion failed')

       setBanners((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete the banner. Try again.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 bg-white min-h-screen text-slate-900">
      
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Banner Management</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Create, edit, and track current system homepage slides.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-sm font-semibold h-11">
          <Plus className="mr-2 h-4 w-4" /> Create New Banner
        </Button>
      </div>

       {loading ? (
          <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : banners.length === 0 ? (
         <Card className="border-dashed border-2 border-slate-200 shadow-none rounded-2xl bg-slate-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-slate-100 rounded-full mb-3 text-slate-400">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No banners found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">Create your very first live slide to initialize the home page slider.</p>
          </CardContent>
        </Card>
      ) : (
         <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6 w-[120px]">Image</th>
                <th className="py-4 px-6">Title & Info</th>
                <th className="py-4 px-6">CTA Link</th>
                <th className="py-4 px-6 text-right w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Contained Preview Cell */}
                  <td className="py-4 px-6 vertical-align-middle">
                    <div className="relative aspect-[16/9] w-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-100">
                      <Image 
                        src={banner.image} 
                        alt={banner.title} 
                        fill 
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  </td>

                  {/* Metadata Info Cell */}
                  <td className="py-4 px-6 max-w-sm">
                    <div className="font-bold text-slate-900 truncate">{banner.title}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{banner.description || 'No description provided.'}</div>
                  </td>

                  {/* Redirection Links Cell */}
                  <td className="py-4 px-6">
                    {banner.redirectTo ? (
                      <a href={banner.redirectTo} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline gap-1">
                        {banner.redirectTo} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">None</span>
                    )}
                  </td>

                   <td className="py-4 px-6 text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 w-9 p-0 border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg"
                      onClick={() => alert('Edit feature coming soon (requires updating backend route to patch fields)')}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={deletingId === banner.id}
                      className="h-9 w-9 p-0 border-slate-200 text-destructive hover:bg-destructive/5 hover:text-destructive rounded-lg"
                      onClick={() => handleDelete(banner.id)}
                    >
                      {deletingId === banner.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       <CreateBannerDialog
        open={isFormOpen}
        onOpenChange={(isOpen) => {
          setIsFormOpen(isOpen)
          if (!isOpen) fetchBanners() // Refreshes listings automatically when form shuts down
        }}
      />
    </div>
  )
}