import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateProduct } from '@/hooks/products/use-create-product'

import { Button } from '../ui/button'

import { FormProduct } from './form-product'

export function CreateProduct() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { onCreateProduct } = useCreateProduct()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 h-7" size="sm">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
            Crear producto
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear producto</DialogTitle>
        </DialogHeader>
        <FormProduct
          onSubmit={async data => {
            await onCreateProduct(data)
            setIsDialogOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
