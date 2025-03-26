'use client'

import React from "react"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"

const Mission = () => {
  return (
    <section
      id="mission"
      className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto"
    >
      <CardContainer>
        <CardBody className="min-h-[680px] sm:min-h-[720px] bg-zinc-900 text-white rounded-xl p-6 sm:p-10 pb-8 sm:pb-10 border border-white/10 shadow-xl w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">
          
          {/* Banner Image centered and fully visible */}
          <CardItem translateZ={80} className="w-full flex justify-center">
            <img
              src="/ultra-banner.png"
              alt="iGoUltra Mission"
              className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] aspect-square object-cover rounded-lg shadow-xl"
             />
          </CardItem>

          {/* Title centered */}
          <CardItem translateZ={50} className="text-3xl sm:text-4xl font-bold text-ultra-red text-center">
            Unsere Mission
          </CardItem>

          {/* Description */}
          <CardItem translateZ={30} className="text-base sm:text-lg text-gray-300 leading-relaxed text-center">
            iGoUltra verbindet Community, Bewegung und mentale Stärke mit dem
            Stil von Manga, Gamification und futuristischer Tech.
            <br />
            Du kämpfst gegen deine Dämonen, sammelst XP im echten Leben und
            formst dein digitales Alter Ego.
          </CardItem>

          {/* XP Progress */}
          <CardItem translateZ={30} className="mt-4 text-left w-full space-y-1">
            <div className="text-sm font-semibold text-white">XP Progress</div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-ultra-red transition-all duration-500"
                style={{ width: "65%" }}
              />
            </div>
            <div className="text-xs text-gray-400">650 / 1000 XP</div>
          </CardItem>

          {/* Level & Button (side-by-side even on mobile) */}
          <CardItem
            translateZ={20}
            className="mt-4 flex flex-row justify-between items-center gap-x-4 w-full"
          >
            <span className="text-sm text-white whitespace-nowrap">🥷 Level 5</span>
            <button className="bg-ultra-red text-white text-xs px-5 py-2 rounded-full hover:bg-red-700 transition-all duration-300 whitespace-nowrap">
              🔥 GRIND NOW
            </button>
          </CardItem>

          {/* Footer Note */}
          <CardItem translateZ={20} className="mt-4 text-sm italic text-muted-foreground">
            🔥 Join the movement. Level up in real life.
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export default Mission
