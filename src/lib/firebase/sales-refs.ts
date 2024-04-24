/* eslint-disable padding-line-between-statements */
import { collection, doc } from 'firebase/firestore'

import { firestore } from '@/config/firebase.config'

export const SalesCollection = collection(firestore, 'sales')
export const getSaleDocRef = (id: string) => doc(SalesCollection, id)
