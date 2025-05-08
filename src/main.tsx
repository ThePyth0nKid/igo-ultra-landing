// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import API from '@/lib/axios'
import './index.css'

async function bootstrapCsrf() {
  try {
    await API.get('/api/v1/auth/csrf/')
    console.log('✅ CSRF cookie fetched')
  } catch (err) {
    console.error('❌ Could not fetch CSRF token:', err)
  }
}

bootstrapCsrf().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})
