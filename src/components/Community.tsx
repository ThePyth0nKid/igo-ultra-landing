"use client"

import React from "react"
import { Carousel, Card } from "@/components/ui/carousel"

const Community = () => {
  const items = [
    {
      title: "Franzi aka Alpaka",
      category: "Suporter",
      src: "/images/AlpakaV1.jpg",
      content: (
        <p>
          Unsere Ultra-Family wächst täglich. Finde Gleichgesinnte, die denselben inneren Kampf führen.
        </p>
      ),
    },
    {
      title: "Smash the Brick Commander",
      category: "Character Story Design",
      src: "/images/SmashV1.jpg",
      content: (
        <p>
          Sammle XP durch echte Aktionen. Klettere in den Rängen und zeig, was in dir steckt!
        </p>
      ),
    },
    {
      title: "Discord",
      category: "Join us",
      src: "/images/community3.jpg",
      content: (
        <div>
          <p className="mb-4">
            Tritt unserer Ultra-Family auf Discord bei – Austausch, Motivation, Updates & mehr!
          </p>
          <a
            href="https://discord.gg/igo-ultra"
            target="_blank"
            className="inline-block bg-ultra-red text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700 transition"
          >
            🔥 Join the Discord
          </a>
        </div>
      ),
    },
    {
      title: "Challenges",
      category: "Daily Grind",
      src: "/images/community4.jpg",
      content: (
        <p>
          Nimm an täglichen XP-Challenges teil – Push-Ups, Meditation oder 10k Steps. Du entscheidest.
        </p>
      ),
    },
    {
      title: "Create with us",
      category: "Kreativität",
      src: "/images/community5.jpg",
      content: (
        <p>
          Bock auf Storytelling, Games oder Design? Wir suchen kreative Köpfe, die mit uns was Großes bauen.
        </p>
      ),
    },
  ]

  return (
    <section id="community" className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-10 text-white">Join the Ultra-Family</h2>
      <Carousel
        items={items.map((item, i) => (
          <Card key={i} index={i} card={item} />
        ))}
      />
    </section>
  )
}

export default Community
