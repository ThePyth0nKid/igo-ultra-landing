'use client'

import React from "react"
import { motion } from "framer-motion"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"
import Loader from "@/components/ui/loader"
import { useVideoReady } from "@/components/ui/useVideoReady"

const ultraFitFacts = [
  {
    title: "🎮 Quest im Alltag",
    text: "Erledige echte Missionen wie 100 Push-Ups oder einen 5km-Run und schalte Belohnungen frei – direkt im Game.",
    video: "/videos/quest.mp4",
    hashtag: "#PushYourLimits"
  },
  {
    title: "🌐 Digital trifft Realität",
    text: "Du trainierst nicht für Likes – du trainierst für XP. Jede Bewegung zählt. Dein Fortschritt wird sichtbar.",
    video: "/videos/runner.mp4",
    hashtag: "#TrainForXP"
  },
  {
    title: "🧠 Fokus & Atmung",
    text: "Wim Hof, Box Breathing oder Ultra-Breathe: Dein Atem wird zur Superpower. Reduziert Stress. Erhöht Leistung.",
    video: "/videos/breathwork.mp4",
    hashtag: "#UltraBreathe"
  },
  {
    title: "💥 Kein Stillstand mehr",
    text: "Mit Leaderboards, Fraktionen und Gangs bleibt dein Training spannend – jede Woche neue Challenges.",
    video: "/videos/leaderboard.mp4",
    hashtag: "#GrindNeverStops"
  }
]

const VideoCard = ({ src }: { src: string }) => {
  const { ready, handleCanPlay } = useVideoReady()

  return (
    <div className="relative w-full h-40 mb-4 rounded-md flex items-center justify-center overflow-hidden bg-black">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <Loader />
        </div>
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        className={`h-full object-contain transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

const UltraFitSection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-black">
      {/* Headline & Text */}
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
          Und wenn du Lust hast was zu zocken – dann zockst du nicht irgendein Spiel.
          Du zockst mit deinem eigenen, real gelevelten Alter Ego. Dein Fortschritt ist kein Fake.
          Dein Ultra-Ich ist real. Und alles beginnt mit deinem Körper.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-2">
        {ultraFitFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <CardContainer>
              <CardBody className="relative flex flex-col items-center text-center bg-zinc-900 border border-white/10 rounded-xl p-6 shadow-xl transition-all hover:shadow-[0_0_40px_#e10600] animate-pulse-glow">

                {/* Titel */}
                <CardItem translateZ={30}>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {fact.title}
                  </h3>
                </CardItem>

                {/* Video mit Loader */}
                <CardItem translateZ={50}>
                  <VideoCard src={fact.video} />
                </CardItem>

                {/* Beschreibung */}
                <CardItem translateZ={20}>
                  <p className="text-gray-300 text-sm mb-4 px-2">{fact.text}</p>
                </CardItem>

                {/* Hashtag */}
                <CardItem translateZ={10} className="text-sm text-ultra-red font-bold italic">
                  {fact.hashtag}
                </CardItem>

              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default UltraFitSection
