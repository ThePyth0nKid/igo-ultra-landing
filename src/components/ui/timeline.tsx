"use client"

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  // Measure the height of the scrollable content
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [])

  // Track scroll progress for animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-white font-ultra md:px-10 overflow-hidden" // ✅ added "relative"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto py-24 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl sm:text-5xl mb-6 font-bold text-ultra-red drop-shadow-[0_0_10px_#e10600]">
          Ultra Roadmap
        </h2>
        <p className="text-zinc-400 max-w-xl">
          Follow the evolution of iGoUltra – step by step, from the Grind Game
          to the ultimate VR arena. Every update is a pulse in our journey.
        </p>
      </div>

      {/* Timeline Items */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-20 md:pt-32 md:gap-10 group"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          >
            {/* Left sticky title + dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-ultra-red border border-white shadow-[0_0_20px_#e10600] animate-pulse" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-ultra-gray">
                {item.title}
              </h3>
            </div>

            {/* 3D Card Effect */}
            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 shadow-xl backdrop-blur-md transition duration-300 hover:shadow-[0_0_60px_#e10600]/30"
                whileHover={{ rotateX: 1.5, rotateY: -1.5 }}
              >
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-ultra-gray">
                  {item.title}
                </h3>
                <div className="text-zinc-300 font-light text-base leading-relaxed max-w-2xl">
                  {item.content}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        {/* Animated Scroll Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,white_10%,white_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-ultra-red via-white/30 to-transparent rounded-full shadow-[0_0_30px_#e10600]"
          />
        </div>
      </div>
    </div>
  )
}
