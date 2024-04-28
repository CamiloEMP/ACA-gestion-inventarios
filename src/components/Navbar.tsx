import { NavLink } from 'react-router-dom'
import { BellRing, LogOutIcon, Package, Settings, ShoppingCart } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/use-auth'
import { useAllProducts } from '@/hooks/products/use-all-products'

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { ProductsLowInStock } from './products/products-low-in-stock'
import { ScrollArea } from './ui/scroll-area'

const paths = [
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
  const { user, signOut } = useAuth()

  const { productsLowInStock } = useAllProducts()

  const length = productsLowInStock?.length ?? 0

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
        <Popover>
          <PopoverTrigger>
            <div className="relative flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8">
              <BellRing className="w-5 h-5" />
              <span className="sr-only">Productos bajos en stock</span>
              {length > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full -top-2 -right-2">
                  {length}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="mb-20 ml-2" side="right">
            <ScrollArea className="h-36">
              <div className="px-4">
                <ProductsLowInStock />
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8">
              <Settings className="w-5 h-5" />
              <span className="sr-only">Settings</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col justify-center gap-3 mb-10" side="right">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user?.email}</span>
              <span className="text-xs text-muted-foreground">Administrador</span>
            </div>
            <Button
              className="px-4 py-1.5 text-xs h-fit max-w-40 "
              variant="destructive"
              onClick={signOut}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </PopoverContent>
        </Popover>
      </nav>
    </aside>
  )
}
