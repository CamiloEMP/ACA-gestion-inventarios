import { getDocs } from 'firebase/firestore'

import { SalesCollection } from '@/lib/firebase/sales-refs'
import { type SaleWithId } from '@/models/sale.model'

export async function getSalesHistory() {
  try {
    const sales = await getDocs(SalesCollection)

    return sales.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      } as SaleWithId
    })
  } catch (error) {
    throw new Error('Error getting sales')
  }
}
