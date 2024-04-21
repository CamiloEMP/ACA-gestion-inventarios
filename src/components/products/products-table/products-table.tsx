import { useMemo } from 'react'

import { type ProductWithId } from '@/models/product.model'

import { DataTable } from '../../ui/data-table'
import { Skeleton } from '../../ui/skeleton'

import { productsColumns } from './products-columns'

export function ProductsTable({
  products,
  isLoading,
  onDelete,
  onEdit,
}: {
  products: ProductWithId[]
  isLoading: boolean
  onDelete: (product: ProductWithId) => void
  onEdit: (product: ProductWithId) => void
}) {
  const tableData = useMemo(
    () => (isLoading ? Array<ProductWithId>(5).fill({} as ProductWithId) : products),
    [isLoading, products],
  )

  const columns = productsColumns({ onDelete, onEdit })

  const columnsMemo = useMemo(
    () =>
      isLoading
        ? columns.map(column => ({
            ...column,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: () => <Skeleton className="h-5" />,
          }))
        : columns,
    [isLoading, columns],
  )

  return <DataTable columns={columnsMemo} data={tableData} />
}
