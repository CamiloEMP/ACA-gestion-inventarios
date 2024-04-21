import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Outlet } from 'react-router-dom'

import { AuthProvider } from '@/context/auth-context'

export function AppProviders() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </AuthProvider>
  )
}
