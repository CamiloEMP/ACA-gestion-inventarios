export const enum SaleState {
  Paid = 'paid',
  Pending = 'pending',
  Canceled = 'canceled',
  Returned = 'returned',
}

export interface Sale {
  date: string
  state: SaleState
  products: {
    id: string
    name: string
    price: number
    quantity: number
    discountApplied: number
  }[]
}

export interface SaleWithId extends Sale {
  id: string
}
