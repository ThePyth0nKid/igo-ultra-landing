import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation Variants
  const logoVariant = {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const buttonGroupVariant = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300
        ${scrolled
          ? "bg-black/95 shadow-2xl backdrop-blur-md border-b border-gray-800"
          : "bg-black/70 backdrop-blur border-b border-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Logo (rechts → links) */}
        <motion.div
          className="flex items-center gap-3 justify-start"
          variants={logoVariant}
          initial="hidden"
          animate="visible"
        >
          <img src="/logo.png" alt="iGoUltra Logo" className="h-10 w-auto" />
        </motion.div>

        {/* Navigation Links (zentriert, gestaffelt von oben) */}
        <div className="hidden md:flex justify-center space-x-6 text-sm text-white font-medium">
          {["Mission", "Roadmap", "Community"].map((label, i) => (
            <motion.a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="hover:text-ultra-red transition"
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
            >
              {label}
            </motion.a>
          ))}
        </div>

        {/* Buttons (links → rechts) */}
        <motion.div
          className="flex justify-end items-center gap-4"
          variants={buttonGroupVariant}
          initial="hidden"
          animate="visible"
        >
          <Button
            asChild
            className="bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <a href="#">Login</a>
          </Button>

          <Button
            asChild
            className="bg-ultra-red hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <a href="#">Sign up</a>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
