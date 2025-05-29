'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"

const ultraPaths = [
  {
    id: "fit",
    title: "ULTRAFIT",
    image: "/icons/fit-white.svg",
    description: "Körperliches Training. Push-Ups. Running. Atem.",
    subs: [
      "Kraft & Calisthenics",
      "Ausdauer & Running",
      "Mobility",
      "🌬️ Performance Atmung",
      "🥦 Ernährung für Kraft"
    ]
  },
  {
    id: "mind",
    title: "ULTRAMIND",
    image: "/icons/mind-white.svg",
    description: "Lernen. Mathe. Code. Logik. Fokus.",
    subs: [
      "Programmieren",
      "Mathe & Physik",
      "Problem Solving",
      "Speed Reading",
      "🥦 Brain Food"
    ]
  },
  {
    id: "spirit",
    title: "ULTRASPIRIT",
    image: "/icons/spirit-white.svg",
    description: "Sinn. Flow. Selbstfindung. Shadow Work.",
    subs: [
      "Shadow Work",
      "Flow-Zustände",
      "Philosophie",
      "Journaling",
      "🌬️ Emotionales Breathwork"
    ]
  },
  {
    id: "world",
    title: "ULTRAWORLD",
    image: "/icons/world-white.svg",
    description: "The Grind Game. Fraktionen. Ranglisten.",
    subs: [
      "The Grind Game",
      "Leaderboards & Seasons",
      "Fraktionen & Gangs",
      "Quests & Dungeons",
      "Community"
    ]
  }
]

const UltraPathsSection = () => {
  const [activePath, setActivePath] = useState<string | null>(null)

  const togglePath = (id: string) => {
    setActivePath(prev => (prev === id ? null : id))
  }

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-12">
      <h2 className="text-4xl font-bold text-ultra-red uppercase">Was ist IGOULTRA?</h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-4"
      >
        IGOULTRA ist ein hybrides Trainings- und Lernsystem in einer gamifizierten Welt.  
        Du sammelst XP im echten Leben durch Bewegung, Wissen, Atem und Fokus.  
        <br /><br />
        Wähle deinen Pfad – <strong>Körper, Geist, Seele oder Spielwelt</strong> – und entwickle dein digitales Alter Ego.  
        Mit jeder Challenge steigst du im Level auf und kämpfst gemeinsam mit der Community gegen deine inneren Dämonen.  
        <br /><br />
        Kein Plan. Keine Theorie. Reale Veränderung durch Training, Lernen und Mindset.  
        <strong>Willkommen bei IGOULTRA.</strong> Es beginnt in dir.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ultraPaths.map((path) => (
          <div key={path.id} className="flex flex-col items-center">
            <CardContainer>
              <CardBody
                className="transition-all border border-white/10 bg-zinc-900 text-white rounded-xl p-4 sm:p-5 w-[240px] h-[300px] flex flex-col items-center justify-center shadow-ultra-glow animate-ultra-pulse"
              >
                <CardItem translateZ={40} className="w-16 h-16 mb-3">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-contain"
                  />
                </CardItem>

                <CardItem translateZ={30} className="text-base font-bold text-ultra-red uppercase">
                  {path.title}
                </CardItem>

                <CardItem translateZ={20} className="text-xs text-gray-400 mt-1">
                  {path.description}
                </CardItem>

                <CardItem translateZ={10} className="mt-4">
                  <button
                    onClick={() => togglePath(path.id)}
                    className="text-xs bg-ultra-red text-white px-4 py-1 rounded-full hover:bg-red-700 transition-all"
                  >
                    {activePath === path.id ? "SCHLIESSEN" : "ÖFFNEN"}
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            <AnimatePresence>
              {activePath === path.id && (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-1 text-sm text-gray-300 text-left"
                >
                  {path.subs.map((sub, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="bg-zinc-800 px-4 py-2 rounded-md border border-white/5 w-[240px]"
                    >
                      {sub}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UltraPathsSection
