import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/context/auth-context'

import { QueryProvider } from './query-client.provider'

export function AppProviders() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryProvider>
  )
}
