import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

import { useAllProducts } from '@/hooks/products/use-all-products'
import { type ProductWithId } from '@/models/product.model'
import { formatCurrency } from '@/utils/format-price.utils'
import { cn } from '@/lib/utils'

import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function FormSale({
  isLoading,
  onRegisterSale,
}: {
  isLoading: boolean
  onRegisterSale: (
    data: {
      id: string
      name: string
      price: number
      discountApplied: number
      quantity: number
    }[],
  ) => void
}) {
  const { products } = useAllProducts()
  const [productsSelected, setProductsSelected] = useState<
    (ProductWithId & {
      selected: boolean
      quantity: number | undefined
    })[]
  >([])

  const total = productsSelected.reduce((acc, product) => {
    if (product.selected) {
      return acc + product.price * (product.quantity ?? 1)
    }

    return acc
  }, 0)

  const totalWithDiscount = productsSelected.reduce((acc, product) => {
    if (product.selected) {
      const discount = product.discount ? product.discount / 100 : 0

      return acc + (product.price - product.price * discount) * (product.quantity ?? 1)
    }

    return acc
  }, 0)

  const handleCheck = (productId: string) => () => {
    setProductsSelected(
      productsSelected.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            selected: !product.selected,
          }
        }

        return product
      }),
    )
  }

  const handleQuantity = (productId: string, quantity: number) => {
    const currentProduct = productsSelected.find(p => p.id === productId)

    if (quantity < 1) return
    if (!currentProduct) return
    if (quantity > currentProduct.stock) return

    setProductsSelected(
      productsSelected.map(product => {
        if (product.id === productId && product.selected && quantity <= product.stock) {
          return {
            ...product,
            quantity: quantity,
          }
        }

        return product
      }),
    )
  }

  const handleRegisterSale = () => {
    const soldProducts = productsSelected.filter(p => p.selected)

    onRegisterSale(
      soldProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        discountApplied: p.discount ? p.discount : 0,
        quantity: p.quantity ?? 1,
      })),
    )
  }

  useEffect(() => {
    if (products) {
      setProductsSelected(products.map(p => ({ ...p, selected: false, quantity: undefined })))
    }
  }, [products])

  return (
    <section className="space-y-4">
      <section className="flex flex-col px-1 overflow-auto max-h-80 min-w-[896px]">
        {productsSelected.map(product => (
          <div
            key={product.id}
            className={cn(
              'grid grid-cols-6 items-center px-1 py-2 hover:bg-gray-100 border rounded',
              {
                'bg-gray-100': product.selected,
              },
            )}
          >
            <Checkbox checked={product.selected} onCheckedChange={handleCheck(product.id)} />
            <span className="text-xs font-semibold truncate w-30">{product.name}</span>
            <span className="text-xs text-gray-500">{formatCurrency(product.price)}</span>
            <span className="text-xs text-gray-500">
              {product.discount ? `Descuento: ${String(product.discount)}%` : 'Sin descuento'}
            </span>
            <Input
              className="w-20 px-1 py-1"
              disabled={!product.selected || product.stock === 0}
              type="number"
              value={product.quantity}
              onChange={e => {
                const value = e.target.value

                handleQuantity(product.id, value ? parseInt(value) : 1)
              }}
            />
            <span className="text-xs text-gray-500">
              Stock {product.stock === 0 ? 'Agotado' : ' '}
              {product.stock}
            </span>
          </div>
        ))}
      </section>
      <section>
        <div className="flex justify-between px-1 py-2">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-sm font-semibold">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between px-1 py-2">
          <span className="text-sm font-semibold">Total con descuento aplicado</span>
          <span className="text-sm font-semibold">{formatCurrency(totalWithDiscount)}</span>
        </div>
      </section>
      <section className="flex justify-end px-1 py-2">
        <Button disabled={total === 0 || isLoading} onClick={handleRegisterSale}>
          {isLoading ? <Loader className="w-5 h-5 mr-2" /> : null}
          Registrar venta
        </Button>
      </section>
    </section>
  )
}
