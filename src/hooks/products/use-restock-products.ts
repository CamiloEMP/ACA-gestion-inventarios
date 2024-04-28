import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { restockProduct } from '@/services/products/restock-product.service'

import { saleQueryKeys } from '../sales/sale-query-keys'

import { productQueryKeys } from './product-query-keys'

export function useRestockProducts() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: restockProduct,
  })

  const onRestockProducts = async ({
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
  }) => {
    await mutation.mutateAsync(
      {
        productId,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success('Producto reabastecido correctamente')

          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          queryClient.invalidateQueries({
            queryKey: productQueryKeys.all,
          })
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          queryClient.invalidateQueries({
            queryKey: saleQueryKeys.all,
          })
        },
        onError: () => {
          toast.error('Error reabasteciendo el producto')
        },
      },
    )
  }

  return {
    onRestockProducts,
    isError: mutation.isError,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
