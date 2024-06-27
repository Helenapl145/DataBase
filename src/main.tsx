import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RoutesApp } from './routes/index.tsx'
import { AuthProvider } from './hooks/auth.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
    
  </React.StrictMode>,
)
