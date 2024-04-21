import { useState } from 'react'

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
        <Button variant="outline">Crear producto</Button>
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
