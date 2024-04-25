import { increment, writeBatch } from 'firebase/firestore'

import { firestore } from '@/config/firebase.config'
import { getProductDocRef } from '@/lib/firebase/products-refs'
import { SaleState, type SaleWithId } from '@/models/sale.model'
import { getSaleDocRef } from '@/lib/firebase/sales-refs'

export async function makeSaleReturn({ sale }: { sale: SaleWithId }) {
  try {
    const products = sale.products.map(product => ({
      id: product.id,
      quantity: product.quantity,
    }))

    const batch = writeBatch(firestore)

    const saleRef = getSaleDocRef(sale.id)

    products.forEach(product => {
      const productRef = getProductDocRef(product.id)

      batch.update(productRef, {
        stock: increment(product.quantity),
      })
    })

    batch.update(saleRef, {
      state: SaleState.Returned,
    })

    await batch.commit()
  } catch (error) {
    throw new Error('Error al hacer la devolución de la venta')
  }
}
