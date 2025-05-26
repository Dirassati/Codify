import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { PageContextProvider } from './contexts/PageContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <PageContextProvider >

    <App />
  </PageContextProvider>
    
    </AuthContextProvider>
  ,
)
