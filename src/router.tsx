import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from './layouts/main-layout'
import { ProductsPage } from './pages/products.page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { path: '/dashboard', element: <div>Dashboard</div> },
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
])
