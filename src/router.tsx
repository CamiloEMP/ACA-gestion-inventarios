import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from './layouts/main-layout'
import { ProductsPage } from './pages/products-page'
import { LoginForm } from './pages/login-page'
import { AppProviders } from './providers/app-providers'
import { ProtectedRoute } from './components/protected-route'
import { SalesHistoryPage } from './pages/sales-history-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProviders />,
    children: [
      { path: '/', element: <LoginForm /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '/dashboard', element: <div>Dashboard</div> },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'sales-history',
            element: <SalesHistoryPage />,
          },
        ],
      },
    ],
  },
])
