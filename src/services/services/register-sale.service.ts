import { addDoc, increment, writeBatch } from 'firebase/firestore'

import { SalesCollection } from '@/lib/firebase/sales-refs'
import { type SaleWithId, type Sale } from '@/models/sale.model'
import { firestore } from '@/config/firebase.config'
import { getProductDocRef } from '@/lib/firebase/products-refs'

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
    const batch = writeBatch(firestore)

    const saleData: Sale = {
      date,
      products: soldProducts,
    }

    const products = soldProducts.map(product => ({
      id: product.id,
      quantity: product.quantity,
    }))

    products.forEach(product => {
      const productRef = getProductDocRef(product.id)

      batch.update(productRef, {
        stock: increment(-product.quantity),
      })
    })

    const docRef = await addDoc(SalesCollection, saleData)

    await batch.commit()

    return {
      ...saleData,
      id: docRef.id,
    } satisfies SaleWithId
  } catch (error) {
    throw new Error('Error registering sale')
  }
}
