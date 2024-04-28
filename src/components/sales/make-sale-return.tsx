import { Loader, PackageMinusIcon } from 'lucide-react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMakeSaleReturn } from '@/hooks/sales/use-make-sale-return'
import { type SaleWithId } from '@/models/sale.model'

import { Button } from '../ui/button'

export function MakeSaleReturn({ sale }: { sale: SaleWithId }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { onMakeSaleReturn, isPending } = useMakeSaleReturn()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="px-2 py-1.5 text-xs font-bold border-2 border-red-500 text-red-500 bg-red-100 shadow-none h-fit hover:bg-red-500 hover:text-white">
          <PackageMinusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estas seguro de hacer la devolución?</DialogTitle>
        </DialogHeader>
        <p> Al hacer la devolución se sumará la cantidad de productos devueltos al stock</p>
        <section>
          <Button
            className="mt-4"
            disabled={isPending}
            size="sm"
            onClick={async () => {
              await onMakeSaleReturn({ sale })
              setIsDialogOpen(false)
            }}
          >
            {isPending ? <Loader className="w-5 h-5 mr-2" /> : null}
            Confirmar devolución
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}
