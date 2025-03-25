"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
}

const Ultra3DCard = ({ children, className = "" }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 1], [15, -15])
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15])

  const springX = useSpring(rotateX, { stiffness: 100, damping: 10 })
  const springY = useSpring(rotateY, { stiffness: 100, damping: 10 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={`rounded-xl bg-ultra-red p-8 shadow-xl transition duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Ultra3DCard
