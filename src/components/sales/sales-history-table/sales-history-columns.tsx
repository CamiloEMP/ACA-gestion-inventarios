import { type ColumnDef } from '@tanstack/react-table'

import { formatCurrency } from '@/utils/format-price.utils'
import { type SaleWithId } from '@/models/sale.model'
import { Button } from '@/components/ui/button'

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
  {
    accessorKey: 'makeDevolution',
    header: 'Hacer devolución',
    cell: () => {
      return (
        <Button className="px-2 py-1.5 text-xs font-bold text-red-500 bg-red-100 shadow-none h-fit hover:bg-red-500 hover:text-white">
          Devolución
        </Button>
      )
    },
  },
]
