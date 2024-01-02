import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { routes } from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>,
)
