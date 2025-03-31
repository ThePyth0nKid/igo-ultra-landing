import { useState } from "react"
import API from "@/lib/axios"  // zentrale API-Instanz
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // clear old errors
    try {
      const res = await API.post("/token/", {
        username,
        password,
      })
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      navigate("/dashboard")
    } catch (err: any) {
      const msg =
        err.response?.data?.detail || "Login failed. Please try again."
      setError(msg)
    }
  }

  const buttonStyle =
    "bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"

  return (
    <section className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
      <CardContainer>
        <CardBody className="min-h-[480px] sm:min-h-[720px] bg-zinc-900 text-white rounded-xl p-6 sm:p-10 pb-8 sm:pb-10 border border-white/10 shadow-xl w-full max-w-md sm:max-w-lg mx-auto hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">

          {/* Headline */}
          <CardItem translateZ={30}>
            <h1 className="text-3xl font-bold text-ultra-red mb-2">
              Login to iGoUltra
            </h1>
          </CardItem>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="w-full space-y-4 max-w-sm mx-auto text-left"
          >
            <CardItem translateZ={20}>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </CardItem>

            <CardItem translateZ={20}>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardItem>

            {/* Error Message */}
            {error && (
              <CardItem translateZ={10}>
                <p className="text-red-500 text-sm text-center">{error}</p>
              </CardItem>
            )}

            {/* Login Button */}
            <CardItem translateZ={20} className="flex justify-center">
              <button type="submit" className={buttonStyle}>
                Login
              </button>
            </CardItem>
          </form>

          {/* Signup Redirect */}
          <CardItem translateZ={10} className="text-sm mt-2 text-gray-400">
            Noch keinen Account?{" "}
            <a
              href="/signup"
              className="text-ultra-red hover:underline transition"
            >
              Sign up
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export default Login
