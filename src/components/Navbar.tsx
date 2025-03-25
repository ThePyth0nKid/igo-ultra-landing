import React from "react"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="iGoUltra Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm text-white font-medium">
          <a href="#mission" className="hover:text-ultra-red transition">Mission</a>
          <a href="#roadmap" className="hover:text-ultra-red transition">Roadmap</a>
          <a href="#community" className="hover:text-ultra-red transition">Community</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Login Button – Ultra Style */}
          <Button
            asChild
             className="bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <a href="#">Login</a>
          </Button>

          {/* Signup Button – Hero Style! */}
          <Button
            asChild
            className="bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <a href="#">Sign up</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
