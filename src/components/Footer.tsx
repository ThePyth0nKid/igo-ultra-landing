import React from 'react'
import {
  FaDiscord,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white text-sm pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO & MISSION */}
        <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
          <img
            src="/logo/igu-logo-white.svg"
            alt="IGOULTRA Logo"
            className="w-30 h-30 object-contain"
          />
          <p className="text-xs text-gray-400">
            Trainiere. Lerne. Spiele.  
            <br />
            Werde Teil der Bewegung. AHHU.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="font-semibold text-sm mb-2">Navigation</h4>
          <a href="/#mission" className="text-white hover:text-gray-400 transition">Unsere Mission</a>
          <a href="/#pfade" className="text-white hover:text-gray-400 transition">Deine Pfade</a>
          <a href="/leaderboard" className="text-white hover:text-gray-400 transition">Leaderboard</a>
          <a href="/grindgame" className="text-white hover:text-gray-400 transition">The Grind Game</a>
        </div>

        {/* SUPPORT & RECHT */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="font-semibold text-sm mb-2">Support & Recht</h4>
          <a href="/kontakt" className="text-white hover:text-gray-400 transition">Kontakt</a>
          <a href="/impressum" className="text-white hover:text-gray-400 transition">Impressum</a>
          <a href="/datenschutz" className="text-white hover:text-gray-400 transition">Datenschutz</a>
          <a href="mailto:support@igoultra.de" className="text-white hover:text-gray-400 transition">support@igoultra.de</a>
        </div>

        {/* KONTAKT & SOCIALS */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="font-semibold text-sm mb-2">Kontakt</h4>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaEnvelope className="text-gray-500" />
            <span>support@igoultra.de</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>Baruth/Mark, Brandenburg</span>
          </div>

          <div className="flex gap-4 mt-4 justify-center md:justify-start text-lg">
            <a href="https://discord.gg/igo-ultra" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
              <FaDiscord />
            </a>
            <a href="https://tiktok.com/@igoultra" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
              <FaTiktok />
            </a>
            <a href="https://instagram.com/igoultra" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/@igoultra" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
        © 2025 IGOULTRA. All rights reserved. Never stop. AHHU.
      </div>
    </footer>
  )
}

export default Footer
