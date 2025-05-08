// src/pages/Login.tsx

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

const Login = () => {
  // Discord button style for consistent branding and hover effect
  const discordButtonStyle =
    "bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-bold tracking-wider shadow-xl border-2 border-white transition-all duration-300 transform hover:scale-110"

  // Redirect the user to the backend Discord OAuth login route
  const handleDiscordLogin = () => {
    window.location.href =
      "https://igoultra-backend-v2-7307073ce46e.herokuapp.com/accounts/discord/login/"
  }

  return (
    <section className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
      <CardContainer>
        <CardBody className="min-h-[520px] sm:min-h-[760px] bg-zinc-900 text-white rounded-xl p-6 sm:p-10 pb-8 sm:pb-10 border border-white/10 shadow-xl w-full max-w-md sm:max-w-lg mx-auto hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">
          
          {/* Headline */}
          <CardItem translateZ={30}>
            <h1 className="text-3xl font-bold text-ultra-red mb-4">
              Login to iGoUltra
            </h1>
          </CardItem>

          {/* Discord Login Button */}
          <CardItem translateZ={20}>
            <button onClick={handleDiscordLogin} className={discordButtonStyle}>
              Login with Discord
            </button>
          </CardItem>

          {/* Info Note */}
          <CardItem translateZ={10} className="text-sm mt-2 text-gray-400">
            You will be redirected to Discord to authorize your account.
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export default Login
