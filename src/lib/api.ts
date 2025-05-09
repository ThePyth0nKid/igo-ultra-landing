const API_BASE = import.meta.env.VITE_API_URL

export async function getMe() {
  const res = await fetch(`${API_BASE}/api/v1/auth/me/`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Nicht authentifiziert')
  return res.json()
}
