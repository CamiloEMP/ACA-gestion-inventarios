import { useMutation } from '@tanstack/react-query'

import { type SaleWithId } from '@/models/sale.model'
import { makeSaleReturn } from '@/services/services/make-sale-return.service'

export function useMakeSaleReturn() {
  const mutation = useMutation({
    mutationFn: makeSaleReturn,
  })

  const onMakeSaleReturn = async ({ sale }: { sale: SaleWithId }) => {
    await mutation.mutateAsync({
      sale,
    })
  }

  return {
    onMakeSaleReturn,
    isError: mutation.isError,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
