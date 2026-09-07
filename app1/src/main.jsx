import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContxtProvider from './Components/Context/AuthContext/AuthContxt'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={ queryClient }>
    <AuthContxtProvider>
      <App />
    </AuthContxtProvider>
    </QueryClientProvider> 
  </StrictMode>
)