import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'

import { type ProductWithId } from '@/models/product.model'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-price.utils'

import { RestockProduct } from '../restock-product'
import { BadgeProductStock } from '../badge-product-stock'

export const productsColumns = ({
  onDelete,
  onEdit,
}: {
  onEdit: (product: ProductWithId) => void
  onDelete: (product: ProductWithId) => void
}): ColumnDef<ProductWithId>[] => [
  {
    accessorKey: 'image',
    header: 'Imagen',
    cell(props) {
      return (
        <img
          alt={props.row.original.name}
          className="object-cover bg-center rounded w-14 h-14 aspect-square"
          src={props.row.original.image}
        />
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      const formatted = formatCurrency(amount)

      return <span className="text-right">{formatted}</span>
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = parseInt(row.getValue('stock'), 10)

      return <BadgeProductStock stock={stock} />
    },
  },
  {
    accessorKey: 'discount',
    header: 'Descuento aplicado',
    cell: ({ row }) => {
      const discount = parseInt(row.getValue('discount'), 10)

      if (discount === 0 || Number.isNaN(discount)) {
        return (
          <Badge className="text-right text-neutral-600" variant="secondary">
            No aplica
          </Badge>
        )
      }

      return (
        <Badge className="px-2 font-bold text-blue-500 bg-blue-100 shadow-none hover:bg-blue-100 ">
          {discount}%
        </Badge>
      )
    },
  },
  {
    accessorKey: 'supplier',
    header: 'Proveedor',
  },
  {
    accessorKey: 'restock',
    header: 'Reabastecer',
    cell: ({ row }) => {
      return (
        <RestockProduct
          product={{
            name: row.original.name,
            productId: row.original.id,
          }}
        />
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return null

      return (
        <div className="flex gap-2">
          <Button
            className="px-2 font-bold text-blue-500 bg-blue-100 shadow-none hover:bg-blue-500 hover:text-white"
            size="sm"
            onClick={() => {
              onEdit(row.original)
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            className="px-2 font-bold text-red-500 bg-red-100 shadow-none hover:bg-red-500 hover:text-white"
            size="sm"
            onClick={() => {
              onDelete(row.original)
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    },
  },
]
