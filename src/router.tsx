import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from './layouts/main-layout'

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
      { path: 'products', element: <div>Products</div> },
    ],
  },
])
