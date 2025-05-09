// src/pages/Dashboard.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getMe } from '@/lib/api'

interface User {
  ultra_name: string
  xp: number
  level: number
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getMe()
      .then((data: User) => setUser(data))
      .catch(() => navigate('/'))
  }, [navigate])

  if (!user) return <div>Loading user data…</div>

  const nextLevelXp = (user.level + 1) * 1000
  const progressPercent = Math.min((user.xp / nextLevelXp) * 100, 100)

  return (
    <section id="dashboard" className="py-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <CardContainer>
          <CardBody className="min-h-[500px] bg-zinc-900 text-white rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-[0_0_50px_#e10600] transition duration-300 space-y-6 flex flex-col justify-center items-center">

            {/* User Info */}
            <CardItem translateZ={50} className="space-y-2">
              <h2 className="text-3xl font-bold">{user.ultra_name}</h2>
              <span className="text-sm text-gray-400">Level {user.level}</span>
            </CardItem>

            {/* XP Progress */}
            <CardItem translateZ={30} className="w-full text-left">
              <div className="text-sm font-semibold text-white">XP Progress</div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700 mt-1">
                <div
                  className="h-full bg-ultra-red transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{user.xp} / {nextLevelXp} XP</div>
            </CardItem>

            {/* Actions */}
            <CardItem translateZ={20} className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              <Button variant="outline" onClick={() => navigate('/xp')}>XP Details</Button>
              <Button variant="outline" onClick={() => navigate('/seasons')}>Seasons</Button>
            </CardItem>

            {/* Footer Note */}
            <CardItem translateZ={10} className="text-sm italic text-gray-500">
              🚀 Keep pushing your limits! 🚀
            </CardItem>
          </CardBody>
        </CardContainer>
      </motion.div>
    </section>
  )
}
