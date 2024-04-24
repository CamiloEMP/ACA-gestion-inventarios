import { addDoc } from 'firebase/firestore'

import { SalesCollection } from '@/lib/firebase/sales-refs'
import { type SaleWithId, type Sale } from '@/models/sale.model'

export async function registerSale(
  soldProducts: {
    id: string
    name: string
    price: number
    discountApplied: number
    quantity: number
  }[],
) {
  try {
    const date = new Date().toISOString()

    const saleData: Sale = {
      date,
      products: soldProducts,
    }

    const docRef = await addDoc(SalesCollection, saleData)

    return {
      ...saleData,
      id: docRef.id,
    } satisfies SaleWithId
  } catch (error) {
    throw new Error('Error registering sale')
  }
}
