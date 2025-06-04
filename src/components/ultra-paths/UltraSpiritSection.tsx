import React from "react"
import { motion } from "framer-motion"

const spiritCards = [
  {
    title: "🧘 Atem = Kontrolle",
    text: "Box Breathing, Wim Hof oder Ultra-Breathe – dein Atem bringt Fokus in dein Chaos.",
    hashtag: "#ControlThroughBreath"
  },
  {
    title: "💖 Selbstliebe = Stärke",
    text: "Wer sich selbst akzeptiert, kann alles verändern. Spirit beginnt mit dir.",
    hashtag: "#KnowYourCore"
  },
  {
    title: "🔒 Fokus = Freiheit",
    text: "Lerne zu reflektieren, statt zu reagieren. Spirituelle XP entstehen durch Bewusstsein.",
    hashtag: "#SilentUpgrade"
  }
]

const UltraSpiritSection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-zinc-900 text-white relative">

      {/* Glow Logo */}
      <div className="flex justify-center mb-10">
        <motion.img
          src="/icons/spirit-white.svg"
          alt="UltraSpirit Logo"
          className="w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-[0_0_30px_#7c3aed]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      {/* Headline */}
      <div className="text-center mb-6">
        <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-wide">
          UltraSpirit
        </h2>
      </div>

      {/* Intro Text */}
      <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center max-w-3xl mx-auto mb-12">
        UltraSpirit ist der Weg nach innen: Hier geht es nicht um Kraft oder Geschwindigkeit – sondern um Kontrolle.  
        Kontrolle über deinen Atem. Deine Emotionen. Deine Gedanken.  
        Atemtechniken, Meditation, Journaling, Selbstliebe – all das sind Tools, um das stärkste Upgrade zu aktivieren:   
        <span className="text-purple-400 font-semibold"> Zufriedenheit in dir selbst</span>.  
        Du willst Fortschritt? Dann lerne loszulassen. Du willst Ultra? Dann werde ruhig – und finde deine Mitte.
      </p>

      {/* Video Block */}
      <div className="w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-12 border border-purple-800/30 shadow-lg">
        <video
          src="/videos/spirit-glow.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2">
        {spiritCards.map((item, index) => (
          <motion.div
            key={index}
            className="bg-zinc-950 border border-purple-900/30 rounded-xl p-6 shadow-2xl hover:shadow-[0_0_30px_#7c3aed] transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-purple-300 mb-3">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{item.text}</p>
            <span className="text-xs italic font-bold text-purple-400">{item.hashtag}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default UltraSpiritSection
