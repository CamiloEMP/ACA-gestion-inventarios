import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { getAllProducts } from '@/services/products/get-all-products.service'

export function useAllProducts() {
  const query = useQuery({
    queryKey: ['all-products'],
    queryFn: getAllProducts,
  })

  useEffect(() => {
    if (query.isError) {
      toast.error(query.error.message)
    }
  }, [query.error?.message, query.isError])

  return {
    ...query,
    products: query.data,
  }
}