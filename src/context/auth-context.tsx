import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, googleAuthProvider } from '@/config/firebase.config'

interface AuthContextType {
  user: User | null
  isLoadingAuth: boolean
  sigInWithGoogle: () => Promise<void>
  createUserWithEmailAndPasswordHandler: (email: string, password: string) => Promise<void>
  signInWithEmailAndPasswordHandler: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const navigate = useNavigate()

  const sigInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)

      navigate('/dashboard/products')
    } catch (error) {
      console.error('Error on sign in with Google')
    }
  }

  const signInWithEmailAndPasswordHandler = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      setUser(user)
    } catch (error) {
      console.error('Error on sign in with email and password')
    }
  }

  const createUserWithEmailAndPasswordHandler = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)

      setUser(user)
    } catch (error) {
      console.error('Error on create user with email and password')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userLogged => {
      setUser(userLogged)
      setIsLoadingAuth(false)
    })

    return () => {
      unsubscribe()
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        sigInWithGoogle,
        createUserWithEmailAndPasswordHandler,
        signInWithEmailAndPasswordHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
