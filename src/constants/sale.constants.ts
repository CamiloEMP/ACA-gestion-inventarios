import { SaleState } from '@/models/sale.model'

export const SaleStateSpanish = {
  [SaleState.Canceled]: 'Cancelada',
  [SaleState.Paid]: 'Pagada',
  [SaleState.Pending]: 'Pendiente',
  [SaleState.Returned]: 'Devolución',
} as const
