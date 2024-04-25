import { type ColumnDef } from '@tanstack/react-table'

import { formatCurrency } from '@/utils/format-price.utils'
import { SaleState, type SaleWithId } from '@/models/sale.model'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SaleStateSpanish } from '@/constants/sale.constants'

import { MakeSaleReturn } from '../make-sale-return'

const stateClass = (state: SaleState) => {
  if (state === SaleState.Returned) {
    return 'text-red-500 bg-red-100 hover:bg-red-100 shadow-none font-bold w-20 justify-center'
  }

  if (state === SaleState.Pending) {
    return 'text-yellow-500 bg-yellow-50 hover:bg-yellow-50 shadw-none font-bold w-20 justify-center'
  }

  if (state === SaleState.Canceled) {
    return 'text-neutral-500 bg-neutral-100 hover:bg-neutral-100 shadow-none font-bold w-20 justify-center'
  }

  return 'text-green-500 bg-green-100 hover:bg-green-100 shadow-none font-bold w-20 justify-center'
}

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
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      const state = row.getValue<SaleWithId['state']>('state')

      return (
        <Badge className={cn('text-right', stateClass(state))}>{SaleStateSpanish[state]}</Badge>
      )
    },
  },
  {
    accessorKey: 'makeDevolution',
    header: 'Hacer devolución',
    cell: ({ row }) => {
      const state = row.getValue<SaleWithId['state']>('state')

      if (state === SaleState.Returned) {
        return null
      }

      return (
        <div className="">
          <MakeSaleReturn sale={row.original} />
        </div>
      )
    },
  },
]
