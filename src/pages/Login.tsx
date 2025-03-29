import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post(`${API}/token/`, {
        username,
        password,
      })

      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)

      // ✅ Weiterleitung nach Login
      navigate('/dashboard')
    } catch (err: any) {
      // Zeigt echte Backend-Fehlermeldung (optional)
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Login failed')
      } else {
        setError('Login failed')
      }
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 text-center text-black">Login to iGoUltra</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded p-2 text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-black text-white rounded p-2 font-semibold"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

export default Login
