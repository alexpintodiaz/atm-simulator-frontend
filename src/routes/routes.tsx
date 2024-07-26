import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import { ErrorPage } from '../pages/error-page'
import { Layout } from '../ui/layout'
import App from '../App'
import { Create } from '../pages/create'
import { Auth } from '../pages/auth'
import { ProtectRoute } from '../components/protect-route'

export type Paths = '/' | '/dashboard' | '/create' | '/auth'

type FunctionalPaths = '*' | 'goBack'

export type AllPaths = Paths | FunctionalPaths

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { element: <App />, path: '/' },
      { element: <Create />, path: '/create' },
      { element: <Auth />, path: '/auth' },
      {
        element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
        path: '/dashboard',
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
])
