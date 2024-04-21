import { addDoc } from 'firebase/firestore'

import { ProductsCollection } from '@/lib/firebase/products-refs'
import { uploadFile } from '@/lib/upload-file'
import { type ProductWithId } from '@/models/product.model'

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

    return {
      id: docRef.id,
      ...productData,
      image: urlImage,
    } satisfies ProductWithId
  } catch (error) {
    throw new Error('Error creating product')
  }
}
