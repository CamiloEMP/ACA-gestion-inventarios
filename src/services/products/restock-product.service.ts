import { increment, updateDoc } from 'firebase/firestore'

import { getProductDocRef } from '@/lib/firebase/products-refs'

export async function restockProduct({
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}) {
  try {
    const productRef = getProductDocRef(productId)

    await updateDoc(productRef, {
      stock: increment(quantity),
    })

    return {
      productId,
      quantity,
    }
  } catch (error) {
    throw new Error('No se pudo reabastecer el producto')
  }
}
