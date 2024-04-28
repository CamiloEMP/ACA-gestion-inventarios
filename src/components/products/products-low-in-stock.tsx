import { useAllProducts } from '@/hooks/products/use-all-products'

import { BadgeProductStock } from './badge-product-stock'

export function ProductsLowInStock() {
  const { productsLowInStock } = useAllProducts()

  return (
    <div>
      <ul className="flex flex-col gap-2">
        <h3 className="text-xs font-bold ">Productos con stock bajo</h3>
        {productsLowInStock?.map(product => (
          <li key={product.id} className="grid items-center grid-cols-2 gap-1 py-1">
            <p className="text-xs">{product.name}</p>
            <BadgeProductStock stock={product.stock} />
          </li>
        ))}
      </ul>
    </div>
  )
}
