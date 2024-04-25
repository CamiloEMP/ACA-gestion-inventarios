import { useState } from 'react'
import { Loader, PackageMinusIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { type SaleWithId } from '@/models/sale.model'
import { useMakeSaleReturn } from '@/hooks/sales/use-make-sale-return'

export function MakeSaleReturn({ sale }: { sale: SaleWithId }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const { onMakeSaleReturn, isPending } = useMakeSaleReturn()

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button className="px-2 py-1.5 text-xs font-bold border-2 border-red-500 text-red-500 bg-red-100 shadow-none h-fit hover:bg-red-500 hover:text-white">
          <PackageMinusIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro de hacer la devolución?</AlertDialogTitle>
          <AlertDialogDescription>
            Al hacer la devolución se sumará la cantidad de productos devueltos al stock
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-xs"
            disabled={isPending}
            onClick={async () => {
              await onMakeSaleReturn({ sale })
              setIsAlertOpen(false)
            }}
          >
            {isPending ? <Loader className="w-4 h-4 mr-2" /> : null}
            Confirmar devolución
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
