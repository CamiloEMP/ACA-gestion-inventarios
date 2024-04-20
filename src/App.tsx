import { RouterProvider } from 'react-router-dom'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import { router } from './router'

export function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}
