import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { getAllProducts } from '@/services/products/get-all-products.service'
import { PRODUCT_STOCK } from '@/constants/product.constants'

import { productQueryKeys } from './product-query-keys'

export function useAllProducts() {
  const query = useQuery({
    queryKey: productQueryKeys.all,
    queryFn: getAllProducts,
  })

  useEffect(() => {
    if (query.isError) {
      toast.error(query.error.message)
    }
  }, [query.error?.message, query.isError])

  const productsLowInStock = query.data?.filter(product => product.stock < PRODUCT_STOCK.LOW)

  return {
    ...query,
    products: query.data,
    productsLowInStock,
  }
}
