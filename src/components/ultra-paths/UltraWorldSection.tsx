'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Typ für die einzelnen Features
interface UltraWorldFeature {
  title: string
  text: string
  hashtag: string
}

const ultraWorldFeatures: UltraWorldFeature[] = [
  {
    title: "🌍 Welten bauen",
    text: "Erschaffe deine eigenen Open-World-Umgebungen mit intuitiven Tools. Vom Terrain-Editor bis zu interaktiven Objekten – alles liegt in deiner Hand.",
    hashtag: "#BuildYourUniverse"
  },
  {
    title: "🎮 Spiele entwickeln",
    text: "Nutze deine Programmier- und Design-Skills, um vollständig eigene Spiele zu kreieren. Von Quests über Gegner-KI bis hin zu Level-Design.",
    hashtag: "#DevYourGame"
  },
  {
    title: "🧙 Rollen einnehmen",
    text: "Tauche in Rollenspiele ein: Wähle Klasse, Background und Fähigkeiten, treffe Entscheidungen in Live-Events und präge so die Geschichte der UltraWorld.",
    hashtag: "#RolePlayReal"
  },
  {
    title: "🤝 Community vernetzen",
    text: "Vernetze dich global mit anderen Spielern, tausch Strategien aus, kooperiere in Clans oder gründe eigene Fraktionen – baue so dein Netzwerk auf.",
    hashtag: "#ConnectAndConquer"
  },
  {
    title: "🏆 Events & Wettbewerbe",
    text: "Nimm an regelmäßigen Turnieren, Bau-Contests und Live-Challenges teil. Gewinne Belohnungen, schalte Extras frei und steige im Leaderboard auf.",
    hashtag: "#Compete4Glory"
  }
]

const UltraWorldSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Automatisches Wechseln der Slides, solange isPaused=false
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ultraWorldFeatures.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section id="world" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-zinc-900 text-white relative">
      {/* Pulsierendes World-Logo */}
      <div className="flex justify-center mb-8">
        {/* Achte darauf, dass /icons/world-wide.svg tatsächlich existiert */}
        <motion.img
          src="/icons/world-white.svg"
          alt="UltraWorld Logo"
          className="h-24 sm:h-32 animate-pulse drop-shadow-[0_0_20px_#10b981]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Headline */}
      <div className="text-center mb-6">
        <h2 className="text-4xl sm:text-5xl font-bold uppercase text-ultra-green tracking-wide">
          UltraWorld
        </h2>
      </div>

      {/* Intro-Text */}
      <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center max-w-3xl mx-auto mb-12">
        Willkommen in der UltraWorld – dem Herzstück aller deiner Abenteuer.<br />
        Hier fließen all deine Skills zusammen: Egal ob du Welten baust, Spiele entwickelst, Rollen spielst oder dich mit der Community verbindest.<br />
        UltraWorld ist deine Bühne, deine Community und dein nächster Level-Up zugleich.
      </p>

      {/* Automatisches Feature-Karussell (pausiert beim Hovern) */}
      <div
        className="relative w-full max-w-2xl mx-auto h-64 sm:h-72 lg:h-80 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {ultraWorldFeatures.map((feature, index) =>
            index === current ? (
              <motion.div
                key={feature.title}
                className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-zinc-800 rounded-xl border border-ultra-green/30 p-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-ultra-green mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed mb-6 px-4">
                  {feature.text}
                </p>
                <span className="text-xs italic font-bold text-ultra-green">
                  {feature.hashtag}
                </span>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigations-Punkte */}
      <div className="flex justify-center space-x-2 mt-6">
        {ultraWorldFeatures.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? "bg-ultra-green" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Feature ${idx + 1}`}
            aria-current={idx === current}
          />
        ))}
      </div>
    </section>
  )
}

export default UltraWorldSection
