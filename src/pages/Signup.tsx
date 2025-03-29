import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password1 !== password2) {
      alert('Passwords do not match')
      return
    }

    // später: API call hier
    console.log({ username, password1 })

    // Demo: Weiterleitung nach Signup
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-ultra-red">Create Your Ultra Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:border-ultra-red"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:border-ultra-red"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:border-ultra-red"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-ultra-red hover:bg-red-600 text-white">
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-ultra-red hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
