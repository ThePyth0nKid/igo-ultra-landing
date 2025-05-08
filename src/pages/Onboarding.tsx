import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/lib/axios"

const Onboarding = () => {
  const [ultraName, setUltraName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.patch("/api/v1/auth/me/", {
        ultra_name: ultraName,
      })
      navigate("/dashboard")
    } catch (err) {
      console.error("Failed to set ultra_name", err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Choose your Ultra Name</h2>
        <input
          type="text"
          value={ultraName}
          onChange={(e) => setUltraName(e.target.value)}
          placeholder="e.g. ShadowRunner42"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-ultra-red text-white py-2 px-4 rounded-lg w-full hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  )
}

export default Onboarding
