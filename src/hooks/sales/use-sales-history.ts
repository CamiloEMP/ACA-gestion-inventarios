import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { getSalesHistory } from '@/services/services/get-sales-history.service'

import { saleQueryKeys } from './sale-query-keys'

export function useSalesHistory() {
  const query = useQuery({
    queryKey: saleQueryKeys.all,
    queryFn: getSalesHistory,
  })

  useEffect(() => {
    if (query.isError) {
      toast.error(query.error.message)
    }
  }, [query.error?.message, query.isError])

  return {
    ...query,
    salesHistory: query.data,
  }
}
