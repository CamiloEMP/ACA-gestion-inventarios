import { useMemo } from 'react'

import { type SaleWithId } from '@/models/sale.model'

import { DataTable } from '../../ui/data-table'
import { Skeleton } from '../../ui/skeleton'

import { salesHistoryColumns } from './sales-history-columns'

export function SalesHistoryTable({
  sales,
  isLoading,
}: {
  sales: SaleWithId[]
  isLoading: boolean
}) {
  const tableData = useMemo(
    () => (isLoading ? Array<SaleWithId>(5).fill({} as SaleWithId) : sales),
    [isLoading, sales],
  )

  const columnsMemo = useMemo(
    () =>
      isLoading
        ? salesHistoryColumns.map(column => ({
            ...column,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: () => <Skeleton className="h-5" />,
          }))
        : salesHistoryColumns,
    [isLoading],
  )

  return <DataTable columns={columnsMemo} data={tableData} />
}
