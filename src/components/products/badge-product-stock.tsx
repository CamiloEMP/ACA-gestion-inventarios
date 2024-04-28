import { PRODUCT_STOCK } from '@/constants/product.constants'
import { cn } from '@/lib/utils'

import { Badge } from '../ui/badge'

const stockClass = (stock: number) => {
  if (stock > PRODUCT_STOCK.HIGH) {
    return 'text-green-500 bg-green-100 hover:bg-green-100 shadow-none font-bold px-1 w-28 justify-center'
  }

  if (stock > PRODUCT_STOCK.MEDIUM) {
    return 'text-yellow-500 bg-yellow-50 hover:bg-yellow-50 shadow-none font-bold px-1 w-28 justify-center'
  }

  return 'text-red-500 bg-red-100 hover:bg-red-100 shadow-none font-bold px-1 w-28 justify-center'
}

export function BadgeProductStock({ stock, className }: { stock: number; className?: string }) {
  return <Badge className={cn('text-right', className, stockClass(stock))}>{stock} Unidades</Badge>
}
