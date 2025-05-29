'use client'

import React from "react"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"

const ultraFitFacts = [
  {
    title: "🎮 Quest im Alltag",
    text: "Erledige echte Missionen wie 100 Push-Ups oder einen 5km-Run und schalte Belohnungen frei – direkt im Game.",
    image: "/charts/quest.png"
  },
  {
    title: "🌐 Digital trifft Realität",
    text: "Du trainierst nicht für Likes – du trainierst für XP. Jede Bewegung zählt. Dein Fortschritt wird sichtbar.",
    image: "/charts/progress-real.png"
  },
  {
    title: "🧠 Fokus & Atmung",
    text: "Wim Hof, Box Breathing oder Ultra-Breathe: Dein Atem wird zur Superpower. Reduziert Stress. Erhöht Leistung.",
    image: "/charts/breathwork.png"
  },
  {
    title: "💥 Kein Stillstand mehr",
    text: "Mit Leaderboards, Fraktionen und Gangs bleibt dein Training spannend – jede Woche neue Challenges.",
    image: "/charts/leaderboard.png"
  }
]

const UltraFitSection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
        <h2 className="text-5xl font-bold uppercase text-ultra-red animate-pulse">
          Was unterscheidet ULTRAFIT?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          ULTRAFIT ist kein gewöhnliches Fitnessprogramm. Keine langweilige App, kein passives Punkte-Sammeln.  
          <br /><br />
          Was IGOULTRA erschafft, ist ein Erlebnis: Du trainierst in der echten Welt und levelst deinen Charakter in einer gamifizierten Umgebung.  
          Willst du Fortschritt? Dann push. Willst du Fokus? Dann atme. Willst du Abenteuer? Dann öffne den Pfad.  
          <br /><br />
          Und wenn du lust hast was zu zocken – dann zockst du nicht irgendein Spiel.  
          Du zockst mit deinem eigenen, real gelevelten Alter Ego. Dein Fortschritt ist kein Fake.  
          Dein Ultra-Ich ist real. Und alles beginnt mit deinem Körper.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-2">
        {ultraFitFacts.map((fact, index) => (
          <CardContainer key={index}>
            <CardBody className="relative bg-zinc-900 border border-white/10 rounded-xl p-6 shadow-xl transition-all hover:shadow-[0_0_40px_#e10600] animate-pulse-glow">
              {/* Bild */}
              <CardItem translateZ={50}>
                <img
                  src={fact.image}
                  alt={fact.title}
                  className="w-full h-40 object-contain mb-4 rounded-md"
                />
              </CardItem>

              {/* Titel */}
              <CardItem translateZ={30}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {fact.title}
                </h3>
              </CardItem>

              {/* Text */}
              <CardItem translateZ={20}>
                <p className="text-gray-300 text-sm">{fact.text}</p>
              </CardItem>

              {/* Footer */}
              <CardItem translateZ={10} className="mt-6 text-sm text-ultra-red font-bold italic">
                #GrindNeverStops
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  )
}

export default UltraFitSection
