import { NavLink } from 'react-router-dom'
import { Home, LineChart, Package, Settings, ShoppingCart, Users2 } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const paths = [
  {
    name: 'Dashboard',
    icon: Home,
    to: '/dashboard',
  },
  {
    name: 'Orders',
    icon: ShoppingCart,
    to: '/dashboard/products',
  },
  {
    name: 'Products',
    icon: Package,
    to: '/',
  },
  {
    name: 'Customers',
    icon: Users2,
    to: '/',
  },
  {
    name: 'Analytics',
    icon: LineChart,
    to: '/',
  },
]

export function Navbar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
      id="sidebar"
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {paths.map(path => (
          <Tooltip key={path.name}>
            <TooltipTrigger asChild>
              <NavLink
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                to={path.to}
              >
                <path.icon className="h-5 w-5" />
                <span className="sr-only">{path.name}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{path.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              to="#"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
