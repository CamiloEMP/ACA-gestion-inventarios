import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type SaleWithId } from '@/models/sale.model'
import { makeSaleReturn } from '@/services/services/make-sale-return.service'

import { productQueryKeys } from '../products/product-query-keys'

import { saleQueryKeys } from './sale-query-keys'

export function useMakeSaleReturn() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: makeSaleReturn,
  })

  const onMakeSaleReturn = async ({ sale }: { sale: SaleWithId }) => {
    await mutation.mutateAsync(
      {
        sale,
      },
      {
        onSuccess: () => {
          toast.success('Devolución realizada correctamente')

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
          toast.error('Error realizando la devolución')
        },
      },
    )
  }

  return {
    onMakeSaleReturn,
    isError: mutation.isError,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
