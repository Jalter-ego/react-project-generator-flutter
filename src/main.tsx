import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { Toaster } from 'sonner'
import './index.css'
import { UserProvider } from './hooks/userContext'
import SyncUserWithBackend from './hooks/useSignIn'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
        <UserProvider>
          <SyncUserWithBackend/>
          <Router />
          <Toaster />
        </UserProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
