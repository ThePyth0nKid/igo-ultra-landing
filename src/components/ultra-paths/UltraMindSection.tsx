'use client'

import React from "react"
import { motion } from "framer-motion"
import Loader from "@/components/ui/loader"
import { useLoopingTypingText } from "@/components/ui/useLoopingTypingText"
import { useVideoReady } from "@/components/ui/useVideoReady"

const ultraMindModules = [
  {
    title: "🤖 Prompt Engineering",
    text: "Lerne, wie du mit Prompts mächtige AI-Tools wie ChatGPT steuerst und eigene Agenten entwickelst.",
    video: "/videos/prompting.mp4",
    hashtag: "#MasterThePrompt"
  },
  {
    title: "💻 Programmieren lernen",
    text: "Von Python bis Webentwicklung – ULTRAMIND vermittelt dir die Sprache der Zukunft.",
    video: "/videos/coding.mp4",
    hashtag: "#CodeYourFuture"
  },
  {
    title: "🧠 Problemlösen & Denken",
    text: "Trainiere dein Denken mit Challenges, Coding-Rätseln und kreativen Aufgaben. Lerne, wie ein System denkt.",
    video: "/videos/problem-solving.mp4",
    hashtag: "#ThinkUltra"
  },
  {
    title: "🧬 KI verstehen & nutzen",
    text: "Wie funktioniert ein Large Language Model? Wie baue ich eigene AI-Tools? Alles, was du brauchst, ist hier.",
    video: "/videos/ai.mp4",
    hashtag: "#AIFluency"
  }
]

const VideoCard = ({ src }: { src: string }) => {
  const { ready, handleCanPlay } = useVideoReady()

  return (
    <div className="relative w-full h-36 overflow-hidden rounded-md bg-black">
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
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

const UltraMindSection = () => {
  const typingTitle = useLoopingTypingText("Lerne. Level. Hack die Zukunft.", 60, 1500)

  return (
    <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-zinc-950">
      {/* Headline */}
      <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
        <motion.h2
          className="text-5xl font-bold uppercase text-ultra-blue min-h-[4rem] tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {typingTitle}
          <span className="animate-pulse text-ultra-blue">|</span>
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          ULTRAMIND ist dein Pfad der geistigen Schärfe.  
          Hier entwickelst du Skills, die du brauchst – nicht später, sondern jetzt.  
          Für Quests. Für Fortschritt. Für echte Wirkung in der UltraWorld.
          <br /><br />
          Egal ob du lernst, wie man AI promptet, Systeme baut, Probleme löst oder automatisiert:  
          Alles, was du hier lernst, ist sofort anwendbar – weil es im Spiel gebraucht wird.  
          Kein leeres Wissen, keine graue Theorie.
          <br /><br />
          Jede Challenge ist Teil deines Trainings.  
          Jedes Modul bringt dir XP, schaltet neue Fähigkeiten frei und macht dich bereit für das, was kommt.
          <br /><br />
          ULTRAMIND ist kein Klassenzimmer. Es ist ein Upgrade für deinen Kopf –  
          damit du in der UltraWorld nicht nur überlebst, sondern dominierst.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
        {ultraMindModules.map((modul, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-zinc-800 rounded-xl p-5 shadow-lg border border-white/10 hover:shadow-[0_0_30px_#0ea5e9] transition-all"
          >
            <div className="text-center space-y-3">
              <h3 className="text-lg font-bold text-white">{modul.title}</h3>
              <VideoCard src={modul.video} />
              <p className="text-gray-300 text-sm">{modul.text}</p>
              <span className="text-ultra-blue text-xs italic font-semibold">{modul.hashtag}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default UltraMindSection
