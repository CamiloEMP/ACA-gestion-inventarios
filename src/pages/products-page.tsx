import { FormProduct } from '@/components/products/form-product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ProductsPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
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

function CreateProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear producto</DialogTitle>
        </DialogHeader>
        <FormProduct />
      </DialogContent>
    </Dialog>
  )
}
