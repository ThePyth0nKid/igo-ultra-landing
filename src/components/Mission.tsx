"use client"

import React from "react"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card" // <-- Hier deine 3D Card Components

const Mission = () => {
  return (
    <section
      id="mission"
      className="py-24 px-6 text-center max-w-4xl mx-auto"
    >
      <CardContainer>
      <CardBody className="min-h-[500px] sm:min-h-[550px] md:min-h-[600px] bg-zinc-900 text-white rounded-xl p-10 border border-white/10 shadow-xl w-full sm:w-[42rem] md:w-[48rem] hover:shadow-[0_0_50px_#e10600] transition duration-300_0">
          
          <CardItem translateZ={80}>
            <img
              src="/ultra-banner.png"
              alt="iGoUltra Mission"
              className="w-full h-48 object-cover rounded-lg shadow-xl"
            />
          </CardItem>
          
          <CardItem
            translateZ={50}
            className="text-4xl font-bold text-ultra-red"
          >
            Unsere Mission
          </CardItem>

          <CardItem
            translateZ={30}
            className="text-lg text-gray-300 mt-4 leading-relaxed"
          >
            iGoUltra verbindet Community, Bewegung und mentale Stärke mit dem
            Stil von Manga, Gamification und futuristischer Tech.
            <br />
            Du kämpfst gegen deine Dämonen, sammelst XP im echten Leben und
            formst dein digitales Alter Ego.
          </CardItem>

          <CardItem translateZ={30} className="mt-6 text-left w-full">
            <div className="text-sm font-semibold mb-1 text-white">XP Progress</div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-ultra-red transition-all duration-500"
                style={{ width: "65%" }} // ← kannst du dynamisch machen später
              />
            </div>
            <div className="text-xs mt-1 text-gray-400">650 / 1000 XP</div>
          </CardItem>

          <CardItem translateZ={20} className="mt-6 flex justify-between items-center w-full">
            <span className="text-sm text-white">🥷 Level 5</span>
            <button className="bg-ultra-red text-white text-xs px-4 py-2 rounded-full hover:bg-red-700 transition">
              🔥 GRIND NOW
            </button>
          </CardItem>

          <CardItem
            translateZ={20}
            className="mt-8 text-sm italic text-muted-foreground"
          >
            🔥 Join the movement. Level up in real life.
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export default Mission
