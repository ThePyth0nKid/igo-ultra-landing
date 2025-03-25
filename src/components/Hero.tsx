import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-32 bg-black text-white overflow-hidden">
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
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-ultra text-ultra-red leading-tight mb-6"
        >
          GO BEYOND.<br /> LEVEL UP.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            asChild
            className="bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <a href="#mission">START YOUR GRIND</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
