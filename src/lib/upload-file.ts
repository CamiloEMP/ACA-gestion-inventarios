import { getDownloadURL, uploadBytes } from 'firebase/storage'

import { getProductStorageRef } from './firebase/products-refs'

export const uploadFile = async (file: File) => {
  const fileName = `${new Date().toISOString()}-${file.name}`

  const ref = getProductStorageRef(fileName)

  try {
    await uploadBytes(ref, file)

    return await getDownloadURL(ref)
  } catch (error) {
    throw error
  }
}
