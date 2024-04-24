import { NavLink } from 'react-router-dom'
import { Home, Package, Settings, ShoppingCart } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const paths = [
  {
    name: 'Dashboard',
    icon: Home,
    to: '/dashboard',
  },
  {
    name: 'Productos',
    icon: Package,
    to: '/dashboard/products',
  },
  {
    name: 'Historial de ventas',
    icon: ShoppingCart,
    to: '/dashboard/sales-history',
  },
]

export function Navbar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex"
      id="sidebar"
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {paths.map(path => (
          <Tooltip key={path.name}>
            <TooltipTrigger asChild>
              <NavLink
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                to={path.to}
              >
                <path.icon className="w-5 h-5" />
                <span className="sr-only">{path.name}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{path.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              to="#"
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only">Settings</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
