export interface Product {
  name: string
  price: number
  description: string | null
  image: string
  stock: number
  supplier: string
  discount: number | null
}

export interface ProductWithId extends Product {
  id: string
}
