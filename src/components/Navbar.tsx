'use client'

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "@/lib/axios"

interface User {
  username: string
  avatar?: string
  xp?: number
  level?: number
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check login status and fetch profile
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      setIsLoggedIn(true)
      // Fetch user profile
      axios.get("/api/users/me/")
        .then(res => {
          setUser(res.data)
        })
        .catch(err => {
          console.error("Error fetching user:", err)
          setIsLoggedIn(false)
        })
    }
  }, [])

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setIsLoggedIn(false)
    setUser(null)
    navigate("/")
  }

  const navItems = ["Mission", "Roadmap", "Community"]

  const buttonStyle =
    "bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300
          ${scrolled
            ? "bg-black/95 shadow-2xl backdrop-blur-md border-b border-gray-800"
            : "bg-black/70 backdrop-blur border-b border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center relative">

          {/* Logo left */}
          <div className="flex items-center">
            <img src="/logo.png" alt="iGoUltra Logo" className="h-10 w-auto" />
          </div>

          {/* Center nav links */}
          <motion.div
            className="hidden md:flex justify-center space-x-6 text-sm text-white font-medium"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
          </motion.div>

          {/* Right side: auth buttons or profile */}
          <motion.div
            className="hidden md:flex justify-end items-center gap-4"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {!isLoggedIn ? (
              <>
                <Button asChild className={buttonStyle}>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className={buttonStyle}>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <>
                {user && (
                  <div className="text-white text-sm font-light mr-2">
                    {/* Username and optional XP/Level */}
                    Hi, <span className="font-semibold">{user.username}</span>
                    {user.level !== undefined && (
                      <span className="ml-2 text-ultra-red">Lv. {user.level}</span>
                    )}
                  </div>
                )}
                <Button asChild className={buttonStyle}>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button onClick={handleLogout} className={buttonStyle}>
                  Logout
                </Button>
              </>
            )}
          </motion.div>

          {/* Mobile Burger Menu */}
          <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu section */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-16 left-0 w-full bg-black/95 z-40 px-6 py-8 flex flex-col items-center gap-6 text-white text-xl backdrop-blur"
          >
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

            <div className="flex flex-col gap-4 w-full mt-4">
              {!isLoggedIn ? (
                <>
                  <Button asChild className={buttonStyle}>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className={buttonStyle}>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
                  </Button>
                </>
              ) : (
                <>
                  {user && (
                    <div className="text-white text-sm text-center font-light">
                      Welcome, <span className="font-semibold">{user.username}</span>
                      {user.level !== undefined && (
                        <span className="ml-2 text-ultra-red">Lv. {user.level}</span>
                      )}
                    </div>
                  )}
                  <Button asChild className={buttonStyle}>
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                  </Button>
                  <Button onClick={() => { handleLogout(); setMenuOpen(false); }} className={buttonStyle}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
