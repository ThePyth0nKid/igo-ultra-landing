import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/lib/axios"

const DiscordCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/auth/me/", { withCredentials: true })
        const user = res.data

        // ✅ Check if user has completed profile (ultra_name is set)
        if (user.ultra_name) {
          navigate("/dashboard")
        } else {
          navigate("/onboarding")
        }
      } catch (err) {
        console.error("Failed to verify Discord session:", err)
        navigate("/login")
      }
    }

    fetchUser()
  }, [navigate])

  return <div className="text-white p-10">Verifiziere Discord Login...</div>
}

export default DiscordCallback
