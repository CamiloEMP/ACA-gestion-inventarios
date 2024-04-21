import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type TProductSchema } from '@/schemas/product.schema'
import { createProduct } from '@/services/products/create-product.service'

export function useCreateProduct() {
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
        onSuccess: () => {
          toast.success('Producto creado correctamente')
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
