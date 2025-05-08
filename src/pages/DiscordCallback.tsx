import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/lib/axios"

const DiscordCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Optional: Check if we're already logged in after Discord redirected back
    const fetchUser = async () => {
      try {
        await axios.get("/api/auth/user/", { withCredentials: true })
        navigate("/dashboard") // ✅ If session exists, proceed
      } catch (err) {
        console.error("Discord callback failed or no session:", err)
        navigate("/login") // ❌ Not authenticated, redirect to login
      }
    }

    fetchUser()
  }, [navigate])

  return <div className="text-white p-10">Logging in with Discord...</div>
}

export default DiscordCallback
