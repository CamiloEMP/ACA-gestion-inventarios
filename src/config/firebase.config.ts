import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

import { ENV_CONFIG } from './env.config'

const firebaseConfig = ENV_CONFIG.firebase.config

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)

export const auth = getAuth(app)

export const googleAuthProvider = new GoogleAuthProvider()
