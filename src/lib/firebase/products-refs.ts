/* eslint-disable padding-line-between-statements */
import { collection, doc } from 'firebase/firestore'
import { ref } from 'firebase/storage'

import { firestore, storage } from '@/config/firebase.config'

export const ProductsCollection = collection(firestore, 'products')
export const getProductDocRef = (id: string) => doc(ProductsCollection, id)

export const getProductStorageRef = (fileName: string) => ref(storage, `products/${fileName}`)
