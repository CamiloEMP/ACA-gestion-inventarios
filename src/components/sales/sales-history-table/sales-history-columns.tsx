import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-price.utils'
import { type SaleWithId } from '@/models/sale.model'

export const salesHistoryColumns: ColumnDef<SaleWithId>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha registro',
    cell: ({ row }) => {
      const date = row.getValue<SaleWithId['date']>('date')

      return <span>{new Date(date).toLocaleDateString()}</span>
    },
  },
  {
    accessorKey: 'products',
    header: 'Productos vendidos',
    cell: ({ row }) => {
      const products = row.getValue<SaleWithId['products']>('products')

      return <span className="text-right">{products.length}</span>
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const products = row.getValue<SaleWithId['products']>('products')

      const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity
      }, 0)

      return <span className="text-right">{formatCurrency(total)}</span>
    },
  },
]
