import React from 'react'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pt-32">
      <div>
        <h1 className="text-5xl md:text-7xl font-ultra text-ultra-red leading-tight mb-4">
          GO BEYOND.<br /> LEVEL UP.
        </h1>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          iGoUltra ist mehr als ein Projekt. Es ist eine Bewegung – zwischen Realität, Game & Anime.
        </p>
        <a href="#mission" className="bg-ultra-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition">
          Let's begin the Grind
        </a>
      </div>
    </section>
  )
}

export default Hero
