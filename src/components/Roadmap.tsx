import React from "react"
import { Timeline } from "@/components/ui/timeline"

interface RoadmapItem {
  title: string
  content: React.ReactNode
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "The Grind Game Launch",
    content: (
      <p>
        Beta-Testphase startet mit <strong>XP-System</strong>, Challenges &
        Leaderboard.
      </p>
    ),
  },
  {
    title: "UltraButton Platform",
    content: (
      <p>
        Registrierung, XP-Tracking, Echtzeit-Dashboard & Discord-Bot powered by{" "}
        <strong>the Architect</strong>.
      </p>
    ),
  },
  {
    title: "XP Wearables Integration",
    content: (
      <p>
        Verbindung zu <em>Smartwatches</em>, Sensoren & Kameras für echtes
        Leveln.
      </p>
    ),
  },
  {
    title: "iGoUltra Manga Volume 1",
    content: (
      <p>
        Der offizielle Release der ersten Kapitel mit{" "}
        <strong>Tasame Imora</strong> & dem <span>🧠 Architekten</span>.
      </p>
    ),
  },
  {
    title: "VR/AR Game World",
    content: (
      <p>
        Das digitale Spielfeld wird Realität – mit Portalen, Dungeons &
        Dämonen. <span>👁‍🗨</span>
      </p>
    ),
  },
]

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="relative">
      <Timeline data={roadmapItems} />
    </section>
  )
}

export default Roadmap
