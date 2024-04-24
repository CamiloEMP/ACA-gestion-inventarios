export interface Sale {
  date: string
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
