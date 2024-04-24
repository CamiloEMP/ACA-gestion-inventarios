import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

import { useRegisterSale } from '@/hooks/sales/use-register-sale'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '../ui/dialog'

import { FormSale } from './form-sale'

export function RegisterSale() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { onRegisterSale, isPending } = useRegisterSale()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 h-7" size="sm">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
            Registrar venta
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle>Registrar venta</DialogTitle>
        </DialogHeader>
        <FormSale
          isLoading={isPending}
          onRegisterSale={async data => {
            await onRegisterSale(data)

            setIsDialogOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
