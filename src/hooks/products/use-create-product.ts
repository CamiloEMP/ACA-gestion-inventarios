import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type TProductSchema } from '@/schemas/product.schema'
import { createProduct } from '@/services/products/create-product.service'
import { type ProductWithId } from '@/models/product.model'

import { productQueryKeys } from './product-query-keys'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProduct,
  })

  const onCreateProduct = async (product: TProductSchema) => {
    await mutation.mutateAsync(
      {
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image,
        supplier: product.supplier,
        discount: product.discount ?? null,
        description: product.description ?? null,
      },
      {
        onSuccess: newProduct => {
          toast.success('Producto creado correctamente')

          const previousProducts = queryClient.getQueryData<ProductWithId[]>(productQueryKeys.all)

          if (previousProducts) {
            queryClient.setQueryData<ProductWithId[]>(productQueryKeys.all, [
              ...previousProducts,
              newProduct,
            ])
          } else {
            queryClient.setQueryData<ProductWithId[]>(productQueryKeys.all, [newProduct])
          }
        },
        onError: () => {
          toast.error('Error creando el producto')
        },
      },
    )
  }

  return {
    onCreateProduct,
    isError: mutation.isError,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
