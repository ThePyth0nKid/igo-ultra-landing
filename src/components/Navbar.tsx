'use client'

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Mission", "Roadmap", "Community"]

  // Ultra-style button with glow and pulse
  const buttonStyle =
    "bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"

  return (
    <>
      {/* Navbar container */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300
          ${scrolled
            ? "bg-black/95 shadow-2xl backdrop-blur-md border-b border-gray-800"
            : "bg-black/70 backdrop-blur border-b border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src="/logo.png" alt="iGoUltra Logo" className="h-10 w-auto" />
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6 text-sm text-white font-medium">
            {navItems.map((label, i) => (
              <motion.a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="hover:text-ultra-red transition"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: "easeOut" }}
              >
                {label}
              </motion.a>
            ))}
          </div>

          {/* Desktop buttons */}
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button asChild className={buttonStyle}>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className={buttonStyle}>
              <Link to="/signup">Sign up</Link>
            </Button>
          </motion.div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-16 left-0 w-full bg-black/95 z-40 px-6 py-8 flex flex-col items-center gap-6 text-white text-xl backdrop-blur"
          >
            {/* Mobile nav links */}
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-ultra-red transition"
              >
                {item}
              </a>
            ))}

            {/* Mobile action buttons */}
            <div className="flex flex-col gap-4 w-full mt-4">
              <Button asChild className={buttonStyle}>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild className={buttonStyle}>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
