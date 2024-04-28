import { Search } from 'lucide-react'
import { useState } from 'react'

import { useAllProducts } from '@/hooks/products/use-all-products'
import { CreateProduct } from '@/components/products/create-product'
import { ProductsTable } from '@/components/products/products-table/products-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ProductsPage() {
  const { products, isLoading } = useAllProducts()

  const [search, setSearch] = useState('')

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <section className="flex flex-col h-full max-w-5xl gap-4 mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Productos</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                placeholder="Search..."
                type="search"
                onChange={e => {
                  setSearch(e.target.value)
                }}
              />
            </div>
            <CreateProduct />
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable
            isLoading={isLoading}
            products={filteredProducts ?? []}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        </CardContent>
      </Card>
    </section>
  )
}
