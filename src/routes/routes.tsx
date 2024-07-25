import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import { ErrorPage } from '../pages/error-page'
import { Layout } from '../ui/layout'
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { element: <App />, path: '/' },
      { element: <Dashboard />, path: '/dashboard' },
    ],
  },
  { path: '*', element: <ErrorPage /> },
])
