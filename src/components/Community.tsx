"use client"

import React from "react"
import { Carousel, Card } from "@/components/ui/carousel"

const Community = () => {
  const items = [
    {
      title: "Franzi aka Alpaka",
      category: "Supporter",
      src: "/images/AlpakaV1.jpg",
      content: (
        <p>
          Unsere Ultra-Family wächst täglich. Finde Gleichgesinnte, die denselben inneren Kampf führen.
        </p>
      ),
    },
    {
      title: "Tobi The Catdemon",
      category: "Youngstar",
      src: "/images/tobiV1.jpg",
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
      title: "Vivi La Karma",
      category: "Supporter",
      src: "/images/viviV1.jpg",
      content: (
        <p>
          Nimm an täglichen XP-Challenges teil – Push-Ups, Meditation oder 10k Steps. Du entscheidest.
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
