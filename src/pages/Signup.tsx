import { useState } from "react"
import API from "@/lib/axios"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  // State for form inputs and error
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Handles user registration
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Password match check
    if (password !== password2) {
      setError("Passwords do not match")
      return
    }

    try {
      // Send POST request to registration endpoint (public route)
      await API.post("/api/users/register/", {
        username,
        email,
        password,
        password2,
      })

      // Redirect to login page after successful registration
      navigate("/login")
    } catch (err: any) {
      // Extract error message from response
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {})[0]?.[0] ||
        "Signup failed"
      setError(msg)
    }
  }

  // Reusable button style
  const buttonStyle =
    "bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"

  return (
    <section className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
      <CardContainer>
        <CardBody className="min-h-[480px] sm:min-h-[720px] bg-zinc-900 text-white rounded-xl p-6 sm:p-10 pb-8 sm:pb-10 border border-white/10 shadow-xl w-full max-w-md sm:max-w-lg mx-auto hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">

          {/* Headline */}
          <CardItem translateZ={30}>
            <h1 className="text-3xl font-bold text-ultra-red mb-2">
              Join the Tribe
            </h1>
          </CardItem>

          {/* Signup Form */}
          <form
            onSubmit={handleSignup}
            className="w-full space-y-4 max-w-sm mx-auto text-left"
          >
            {/* Username Field */}
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

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
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

            {/* Error Message */}
            {error && (
              <CardItem translateZ={10}>
                <p className="text-red-500 text-sm text-center">{error}</p>
              </CardItem>
            )}

            {/* Submit Button */}
            <CardItem translateZ={20} className="flex justify-center">
              <button type="submit" className={buttonStyle}>
                Create Account
              </button>
            </CardItem>
          </form>

          {/* Login Redirect */}
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
