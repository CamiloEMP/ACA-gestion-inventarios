import { addDoc } from 'firebase/firestore'

import { ProductsCollection } from '@/lib/firebase/products-refs'
import { uploadFile } from '@/lib/upload-file'

export async function createProduct(product: {
  name: string
  price: number
  stock: number
  image: File
  supplier: string
  discount: number | null
  description: string | null
}) {
  const { image, ...productData } = product

  try {
    const urlImage = await uploadFile(image)

    const docRef = await addDoc(ProductsCollection, {
      ...productData,
      image: urlImage,
    })

    return docRef.id
  } catch (error) {
    throw new Error('Error creating product')
  }
}
