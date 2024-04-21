import { type User, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, googleAuthProvider } from '@/config/firebase.config'

interface AuthContextType {
  user: User | null
  isLoadingAuth: boolean
  sigInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const navigate = useNavigate()

  const sigInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)

      navigate('/dashboard')
    } catch (error) {
      console.error('Error on sign in with Google')
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
    <AuthContext.Provider value={{ user, isLoadingAuth, sigInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
