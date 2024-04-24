import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { registerSale } from '@/services/services/register-sale.service'
import { type SaleWithId } from '@/models/sale.model'

import { productQueryKeys } from '../products/product-query-keys'

import { saleQueryKeys } from './sale-query-keys'

export function useRegisterSale() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: registerSale,
  })

  const onRegisterSale = async (
    soldProducts: {
      id: string
      name: string
      price: number
      discountApplied: number
      quantity: number
    }[],
  ) => {
    await mutation.mutateAsync(soldProducts, {
      onSuccess: newSale => {
        const previousSales = queryClient.getQueryData<SaleWithId[]>(saleQueryKeys.all)

        if (previousSales) {
          queryClient.setQueryData<SaleWithId[]>(saleQueryKeys.all, [...previousSales, newSale])
        } else {
          queryClient.setQueryData<SaleWithId[]>(saleQueryKeys.all, [newSale])
        }

        queryClient
          .invalidateQueries({
            queryKey: productQueryKeys.all,
          })
          .then(() => {
            toast.success('Venta registrada correctamente')
          })
          .catch(() => {
            toast.error('Error registrando la venta')
          })
      },
      onError: () => {
        toast.error('Error registrando la venta')
      },
    })
  }

  return {
    onRegisterSale,
    isError: mutation.isError,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
