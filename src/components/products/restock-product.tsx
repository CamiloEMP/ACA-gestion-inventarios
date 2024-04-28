import { useId, useState } from 'react'
import { Loader } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRestockProducts } from '@/hooks/products/use-restock-products'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function RestockProduct({
  product,
}: {
  product: {
    name: string
    productId: string
  }
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const { onRestockProducts, isPending } = useRestockProducts()

  const inputIdRestock = useId()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 py-0.5 text-xs font-bold text-green-500 bg-green-100 shadow-none hover:bg-green-500 hover:text-white"
          size="sm"
        >
          Reabastecer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reabastecer</DialogTitle>
        </DialogHeader>
        <section>
          <Label htmlFor={inputIdRestock}>
            ¿Cuánto inventario deseas comprar del producto <strong>{product.name}</strong> ?
          </Label>
          <Input
            className="w-full px-2 py-1 mt-2 border border-gray-300 rounded-md"
            id={inputIdRestock}
            placeholder="Cantidad"
            type="number"
            value={quantity}
            onChange={e => {
              setQuantity(parseInt(e.target.value, 10))
            }}
          />
          <Button
            className="mt-4"
            disabled={isPending}
            size="sm"
            onClick={async () => {
              await onRestockProducts({
                productId: product.productId,
                quantity,
              })
              setIsDialogOpen(false)
            }}
          >
            {isPending ? <Loader className="w-5 h-5 mr-2" /> : null}
            Confirmar
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}
