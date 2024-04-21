import { getDocs } from 'firebase/firestore'

import { ProductsCollection } from '@/lib/firebase/products-refs'
import { type ProductWithId } from '@/models/product.model'

export async function getAllProducts() {
  try {
    const products = await getDocs(ProductsCollection)

    return products.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      } as ProductWithId
    })
  } catch (error) {
    throw new Error('Error getting products')
  }
}
