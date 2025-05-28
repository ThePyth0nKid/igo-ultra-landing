import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { redirectToDiscordLogin } from "@/lib/api"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 bg-black text-white overflow-hidden">
      {/* 🔥 Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      >
        <source src="/ultra-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔥 Content */}
      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-ultra text-ultra-red leading-tight"
        >
          EIN PORTAL. VIER PFADEN.<br /> DEIN ULTRA-WEG BEGINNT JETZT.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-200 font-light"
        >
          Körper. Verstand. Geist. Spiel.  
          Wähle deinen Pfad – oder kombiniere sie alle.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            onClick={redirectToDiscordLogin}
            className="bg-transparent hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            PORTAL ÖFFNEN
          </Button>
        </motion.div>
      </div>

      {/* 🔥 Vier Pfade */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        {[
          { title: "UltraFit", href: "#fit" },
          { title: "UltraMind", href: "#mind" },
          { title: "UltraSpirit", href: "#spirit" },
          { title: "UltraWorld", href: "#world" },
        ].map(({ title, href }) => (
          <Button
            key={title}
            asChild
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-6 py-4 rounded-xl font-ultra tracking-widest border-2 border-ultra-red hover:scale-105 transition-all duration-300"
          >
            <a href={href}>{title}</a>
          </Button>
        ))}
      </motion.div>
    </section>
  )
}

export default Hero
