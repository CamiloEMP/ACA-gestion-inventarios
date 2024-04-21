import { useAllProducts } from '@/hooks/products/use-all-products'
import { CreateProduct } from '@/components/products/create-product'
import { ProductsTable } from '@/components/products/products-table/products-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProductsPage() {
  const { products, isLoading } = useAllProducts()

  return (
    <section className="flex flex-col max-w-5xl gap-4 mx-auto mt-14">
      <div className="flex items-center justify-between gap-2">
        <div />
        <CreateProduct />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable
            isLoading={isLoading}
            products={products ?? []}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        </CardContent>
      </Card>
    </section>
  )
}
