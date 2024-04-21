import { Navigate } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

import { LoadingApp } from './loading-app'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoadingAuth } = useAuth()

  if (isLoadingAuth) {
    return <LoadingApp />
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
