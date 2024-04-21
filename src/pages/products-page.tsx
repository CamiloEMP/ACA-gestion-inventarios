import { CreateProduct } from '@/components/products/create-product'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProductsPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div />
        <CreateProduct />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Here are all of the products in your store.</p>
        </CardContent>
      </Card>
    </section>
  )
}
