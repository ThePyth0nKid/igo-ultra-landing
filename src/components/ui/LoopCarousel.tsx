"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoopCarouselProps {
  children: React.ReactNode[]
  speed?: number // Geschwindigkeit in px/s
  pauseOnHover?: boolean
  className?: string
}

export const LoopCarousel = ({
  children,
  speed = 40,
  pauseOnHover = true,
  className,
}: LoopCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const controls = useAnimation()
  const [isPaused, setIsPaused] = useState(false)

  // Cloning children to make seamless loop
  const items = [...children, ...children]

  // Start animation
  useEffect(() => {
    if (!width || isPaused) return

    const loop = async () => {
      await controls.start({
        x: -width,
        transition: {
          duration: width / speed,
          ease: "linear",
        },
      })
      controls.set({ x: 0 })
      loop()
    }

    loop()
  }, [width, speed, isPaused])

  // Get total width
  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth / 2
      setWidth(totalWidth)
    }
  }, [children])

  return (
    <div
      className={cn("overflow-hidden w-full", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-6"
      >
        {items.map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
