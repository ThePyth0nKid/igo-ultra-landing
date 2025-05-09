// src/pages/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '@/lib/api'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    getMe()
      .then(() => setAuth(true))
      .catch(() => navigate('/'))  // alternativ '/login', je nach Flow
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) return <div>Loading…</div>
  return auth ? <>{children}</> : null
}
