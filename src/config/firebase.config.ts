import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { ENV_CONFIG } from './env.config'

const firebaseConfig = ENV_CONFIG.firebase.config

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)
