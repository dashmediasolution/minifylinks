'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Loader2, Tag, BookOpen, KeyRound } from 'lucide-react'
import { toast } from "sonner"
import { CategoryFormDialog, CategoryData } from "@/components/admin/CategoryFormDialog"
import { DeleteCategoryDialog } from "@/components/admin/DeleteCategoryDialog"
import { CategorySkeleton } from '@/components/admin/skeletons/CategorySkeleton'

export default function CategoryManagePage() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/category', { cache: 'no-store' })

      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      } else {
        toast.error("Failed to load categories.")
      }
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Failed to load categories.")
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreate = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  if (loading && categories.length === 0) {
    return <CategorySkeleton />
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 bg-white min-h-screen text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Category Management</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Organize your blog posts into categories.</p>
        </div>
        <Button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 shadow-sm font-semibold h-11">
          <Plus className="mr-2 h-4 w-4" /> Create New Category
        </Button>
      </div>

      <Card className="border border-gray-100 shadow-none rounded-xl overflow-hidden bg-white">
        <CardHeader className="border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <Tag className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">All Categories</CardTitle>
              <CardDescription className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                {categories.length} Total Categories
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50 backdrop-blur-md">
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="font-bold text-gray-900 text-[10px] py-4 uppercase pl-6">Name</TableHead>
                  <TableHead className="font-bold text-gray-900 text-[10px] py-4 uppercase">Description</TableHead>
                  <TableHead className="font-bold text-gray-900 text-[10px] py-4 uppercase">Keywords</TableHead>
                  <TableHead className="font-bold text-gray-900 text-[10px] py-4 uppercase">Posts</TableHead>
                  <TableHead className="font-bold text-gray-900 text-[10px] py-4 uppercase text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                      <TableCell className="py-4 pl-6"><div className="flex flex-col"><span className="font-bold text-gray-900 text-sm">{category.name}</span><span className="font-mono text-xs text-gray-400">{category.slug}</span></div></TableCell>
                      <TableCell className="py-4 text-gray-600 text-sm max-w-[200px] truncate">{category.description || 'N/A'}</TableCell>
                      <TableCell className="py-4 text-gray-600 text-sm max-w-[200px] truncate">
                        {category.keywords ? (
                          <div className="flex items-center gap-2">
                            <KeyRound className="h-3 w-3 text-gray-400 shrink-0" />
                            <span className="italic">{category.keywords}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">None</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-gray-600 text-sm"><div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gray-400" />{category.postCount}</div></TableCell>
                      <TableCell className="py-4 text-right pr-6"><div className="flex justify-end gap-1"><Button size="icon" variant="ghost" onClick={() => handleEdit(category)} className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => setDeleteId(category.id!)} className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button></div></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={5} className="text-center py-20 text-gray-400 text-sm font-medium italic">No categories found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CategoryFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} categoryToEdit={editingCategory} onSuccess={fetchCategories} />
      <DeleteCategoryDialog categoryId={deleteId} onClose={() => setDeleteId(null)} onSuccess={fetchCategories} />
    </div>
  )
}
