import * as React from "react"
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pt-32 bg-black text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-ultra text-ultra-red leading-tight mb-6">
          GO BEYOND.<br /> LEVEL UP.
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          iGoUltra ist mehr als ein Projekt. Es ist eine Bewegung – zwischen Realität, Game & Anime.
        </p>
        <p className="text-ultra-red font-ultra text-2xl">🔥 Ultra Red is live!</p>
        <Button
             asChild
             className="bg-ultra-red hover:bg-red-600 text-white text-lg sm:text-xl px-8 py-4 rounded-full font-ultra tracking-widest shadow-2xl border-4 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
            <a href="#mission">🔥 START YOUR GRIND</a>
        </Button>
      </div>
    </section>
  )
}

export default Hero
