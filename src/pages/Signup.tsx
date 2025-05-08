import { useState } from "react"
import API from "@/lib/axios"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== password2) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await API.post("/api/auth/registration/", {
        username,
        email,
        password1: password,
        password2: password2,
      })

      if (response.status === 201 || response.status === 200) {
        navigate("/login")
      } else {
        const msg =
          response.data?.detail ||
          Object.values(response.data || {})[0]?.[0] ||
          "Signup failed"
        setError(msg)
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {})[0]?.[0] ||
        "Signup failed"
      setError(msg)
    }
  }

  const buttonStyle =
    "bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"

  return (
    <section className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
      <CardContainer>
        <CardBody className="min-h-[480px] sm:min-h-[720px] bg-zinc-900 text-white rounded-xl p-6 sm:p-10 pb-8 sm:pb-10 border border-white/10 shadow-xl w-full max-w-md sm:max-w-lg mx-auto hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">
          <CardItem translateZ={30}>
            <h1 className="text-3xl font-bold text-ultra-red mb-2">
              Join the Tribe
            </h1>
          </CardItem>

          <form
            onSubmit={handleSignup}
            className="w-full space-y-4 max-w-sm mx-auto text-left"
          >
            <CardItem translateZ={20}>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </CardItem>

            <CardItem translateZ={20}>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CardItem>

            <CardItem translateZ={20}>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </CardItem>

            <CardItem translateZ={20}>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-black/80 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-ultra-red"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </CardItem>

            {error && (
              <CardItem translateZ={10}>
                <p className="text-red-500 text-sm text-center">{error}</p>
              </CardItem>
            )}

            <CardItem translateZ={20} className="flex justify-center">
              <button type="submit" className={buttonStyle}>
                Create Account
              </button>
            </CardItem>
          </form>

          <CardItem translateZ={10} className="text-sm mt-2 text-gray-400">
            Already part of the tribe?{" "}
            <a
              href="/login"
              className="text-ultra-red hover:underline transition"
            >
              Log in
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export default Signup
