import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CategorySkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex justify-between items-center gap-6 border-b border-gray-100 pb-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-11 w-48 rounded-lg" />
      </div>

      <Card className="border border-gray-100 shadow-none rounded-xl">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <div>
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="pl-6"><Skeleton className="h-4 w-16" /></TableHead>
                <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                <TableHead><Skeleton className="h-4 w-12" /></TableHead>
                <TableHead className="text-right pr-6"><Skeleton className="h-4 w-16 ml-auto" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-50"><TableCell className="py-4 pl-6"><Skeleton className="h-5 w-32" /></TableCell><TableCell className="py-4"><Skeleton className="h-5 w-40" /></TableCell><TableCell className="py-4"><Skeleton className="h-5 w-40" /></TableCell><TableCell className="py-4"><Skeleton className="h-5 w-8" /></TableCell><TableCell className="py-4 text-right pr-6"><div className="flex justify-end gap-2"><Skeleton className="h-8 w-8" /><Skeleton className="h-8 w-8" /></div></TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}