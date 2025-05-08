// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import API from '@/lib/axios'    // deine Axios-Instanz mit withCredentials
import './index.css'

// 🚀 Bootstrapping: CSRF-Token holen, bevor die App lädt
async function bootstrapCsrf() {
  try {
    await API.get('/api/v1/auth/csrf/')
    console.log('✅ CSRF token fetched')
  } catch (err) {
    console.error('❌ Could not fetch CSRF token:', err)
  }
}

// Sofort ausführen, dann rendern
bootstrapCsrf().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})
