import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "@/lib/axios"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState<string | null>(null)

  useEffect(() => {
    axios.get("/api/v1/auth/me/")
      .then((res) => {
        if (!res.data.ultra_name) {
          setRedirect("/onboarding")
        }
      })
      .catch(() => {
        setRedirect("/")
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null // or a loading spinner

  if (redirect) return <Navigate to={redirect} />

  return children
}

export default PrivateRoute // ✅ <- this line is important
