'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

// ------------------------------------------------------------
// 1. Daten für das Chart (Gamification-Effekte) mit zusätzlichem Info-Text
// ------------------------------------------------------------
interface GamificationDatum {
  category: string
  value: number
  label: string
  info: string
}

const gamificationData: GamificationDatum[] = [
  {
    category: 'Motivation',
    value: 67,
    label: '🎯 Motivation',
    info: 'Gamifizierte Lernumgebungen steigern die Motivation um durchschnittlich 67 % (Sailer et al. 2017).',
  },
  {
    category: 'Lernerfolg',
    value: 89,
    label: '🧠 Lernerfolg',
    info: 'Studien zeigen: +89 % Leistungssteigerung gegenüber klassischer Vorlesung (NTUA 2021).',
  },
  {
    category: 'Adhärenz',
    value: 45,
    label: '💪 Trainingsadhärenz',
    info: 'Gamification erhöht die Trainingsadhärenz um 45 % (Cugelman et al. 2013).',
  },
  {
    category: 'Zufriedenheit',
    value: 78,
    label: '😄 Zufriedenheit',
    info: 'Ein XP-System kann das allgemeine Wohlbefinden um 78 % steigern (Self-Determination + Skinner).',
  },
  {
    category: 'Engagement',
    value: 60,
    label: '👥 Engagement',
    info: 'XP-Wettbewerbe führen zu 60 % mehr Beteiligung (Business Review 2022).',
  },
  {
    category: 'Wissensbehalt',
    value: 90,
    label: '🧬 Wissensbehalt',
    info: 'Aktives, gamifiziertes Lernen erzielt bis zu 90 % Retention (National Training Labs, US).',
  },
]

// ------------------------------------------------------------
// 2. CustomTooltip: Zeigt Label, Info und Value an
// ------------------------------------------------------------
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: GamificationDatum = payload[0].payload
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 w-52">
        <p className="text-sm font-semibold text-gray-800 mb-1">{data.label}</p>
        <p className="text-xs text-gray-600 mb-2">{data.info}</p>
        <p className="text-lg font-bold text-teal-600">{data.value}%</p>
      </div>
    )
  }
  return null
}

// ------------------------------------------------------------
// 3. Chart-Komponente mit CustomTooltip
// ------------------------------------------------------------
const GamificationChart: React.FC = () => {
  return (
    <div className="w-full h-80 md:h-96 mb-12">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={gamificationData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#334155', fontSize: 12 }}
            width={50}
            height={60}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tick={{ fill: '#334155', fontSize: 12 }}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="#22d3ee"
            radius={[8, 8, 0, 0]}
            initial={{ value: 0 }}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ------------------------------------------------------------
// 4. Daten für das Accordion (Wissenschaftliche Theorien)
// ------------------------------------------------------------
interface Theory {
  title: string
  description: string
  source: string
}

const theories: Theory[] = [
  {
    title: 'Selbstbestimmungstheorie (Deci & Ryan)',
    description:
      'Motivation steigt, wenn Kompetenz, Autonomie und soziale Zugehörigkeit erfüllt sind. Gamifizierte Systeme sprechen alle drei Elemente an: klare Ziele (Kompetenz), Wahloptionen (Autonomie) und soziale Interaktion (Zugehörigkeit).',
    source: 'Ryan & Deci, 2000 – Self-Determination Theory',
  },
  {
    title: 'Flow-Theorie (Csíkszentmihályi)',
    description:
      'Menschen sind am glücklichsten, wenn Herausforderung und Fähigkeit im Gleichgewicht sind. Ein dynamisches XP-System hält Nutzende konstant in diesem Sweet Spot: Zu leicht ist langweilig, zu schwer frustriert.',
    source: 'Csíkszentmihályi, 1990 – Flow: The Psychology of Optimal Experience',
  },
  {
    title: 'Operante Konditionierung (Skinner)',
    description:
      'Positives Feedback (z. B. XP-Belohnungen) erhöht die Wiederholungswahrscheinlichkeit eines Verhaltens. Jedes Mal, wenn ein Nutzer etwas erreicht, erhält er sofort Belohnung („positive Verstärkung“).',
    source: 'Skinner, 1938 – The Behavior of Organisms',
  },
  {
    title: 'Gamification im Lernen (Sailer et al., 2017)',
    description:
      'Gamifizierte Systeme steigern Motivation, Leistung und Zufriedenheit, da sie klare Belohnungskaskaden, sofortiges Feedback und kontinuierliches Fortschrittsgefühl bieten.',
    source: 'Sailer et al. (2017) – Gamification in Education',
  },
]

// ------------------------------------------------------------
// 5. Accordion-Eintrag
// ------------------------------------------------------------
const AccordionItem: React.FC<{
  theory: Theory
  isActive: boolean
  onClick: () => void
}> = ({ theory, isActive, onClick }) => {
  return (
    <div className="border-b border-zinc-700">
      <button
        onClick={onClick}
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-900">
          {theory.title}
        </span>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0 }}
          className="text-gray-900 text-2xl"
        >
          +
        </motion.span>
      </button>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden pb-4"
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            {theory.description}
          </p>
          <p className="text-gray-500 text-xs italic mt-2">{theory.source}</p>
        </motion.div>
      )}
    </div>
  )
}

// ------------------------------------------------------------
// 6. Daten für Duale Realität (Realität vs. Ultra-Game)
// ------------------------------------------------------------
interface DualItem {
  real: string
  game: string
}

const dualRealityItems: DualItem[] = [
  { real: 'Du machst 100 Push-Ups', game: 'Dein Charakter wird stärker' },
  { real: 'Du meditierst 5 Minuten', game: 'Deine Fokus-Skill steigt' },
  { real: 'Du läufst 3 km', game: 'Du schaltest neue Zone frei' },
]

// ------------------------------------------------------------
// 7. Dual-Panel für „Realität vs. Ultra-Game“
// ------------------------------------------------------------
const DualRealityPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dualRealityItems.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-4">
          <div className="w-1/2 bg-white/80 rounded-xl p-4">
            <p className="text-gray-900 font-medium">{item.real}</p>
          </div>
          <div className="w-1/2 bg-teal-100 rounded-xl p-4">
            <p className="text-teal-600 font-medium">{item.game}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ------------------------------------------------------------
// 8. Community-Cards
// ------------------------------------------------------------
const communityStatements = [
  '🧩 Du bist Teil eines Systems, das größer ist als du selbst.',
  '🧠 Du trainierst nicht für Likes, du trainierst für deine Transformation.',
  '🌍 Gemeinsam erschaffen wir eine Welt, in der XP wirklich zählt.',
  '🏗️ Du kannst eigene Räume, Games und Systeme gestalten.',
  '📡 XP werden zur neuen Sprache für Fortschritt.',
]

// ------------------------------------------------------------
// 9. Hauptkomponente: UltrascienceSection
// ------------------------------------------------------------
const UltrascienceSection: React.FC = () => {
  // State für Accordion: Index des geöffneten Items (-1 = keines geöffnet)
  const [activeTheory, setActiveTheory] = useState<number>(-1)

  return (
    <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-blue-50 text-gray-900">
      {/* ============================= */}
      {/* 1. Einleitung – Der Claim     */}
      {/* ============================= */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold uppercase text-blue-600 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ultrascience: Der wissenschaftliche Pfad hinter IGOULTRA
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          IGOULTRA ist mehr als ein Spiel. Es ist ein System, das dich geistig
          und körperlich in Bewegung bringt –  
          und die Forschung zeigt klar: Gamification wirkt messbar.  
          Hier siehst du, wie Wissenschaft und Praxis ineinandergreifen, um
          deinen Ultra-Drive zu entfachen.
        </motion.p>
      </div>

      {/* =========================================== */}
      {/* 2. Gamification wirkt – wissenschaftlich   */}
      {/* =========================================== */}
      <div className="mb-28">
        <motion.h3
          className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gamification wirkt – wissenschaftlich belegt
        </motion.h3>

        {/* Hier binden wir den Chart mit CustomTooltip ein */}
        <GamificationChart />
      </div>

      {/* ============================================= */}
      {/* 3. Warum XP Sinn macht – bei IGOULTRA       */}
      {/* ============================================= */}
      <div className="mb-28">
        <motion.h3
          className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Warum XP Sinn macht – bei IGOULTRA
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: '📝',
              label: 'Freischalten von Skilltrees',
              info: 'Mit XP schaltest du neue Skills frei – damit dein Avatar und du gemeinsam wachsen.',
            },
            {
              icon: '🚪',
              label: 'Zugänge zu Trainings-Arenen & Quests',
              info: 'Je mehr XP, desto mehr exklusive Challenges stehen dir zur Verfügung.',
            },
            {
              icon: '📈',
              label: 'Aufstieg in der Community (Creator-Rechte)',
              info: 'Erreiche Creator-Level und gestalte gemeinsam mit anderen neue Inhalte.',
            },
            {
              icon: '🌍',
              label: 'Einfluss auf die Spielwelt',
              info: 'Dein XP-Level entscheidet, welche Regionen und Systeme du mitprägen darfst.',
            },
            {
              icon: '💰',
              label: 'Monetarisierung durch Beitrag & Kreation',
              info: 'Verdiene Token, wenn deine Kreationen aktiv genutzt werden – freigeschaltet durch dein XP-Ranking.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative flex items-center space-x-4 bg-white/80 rounded-xl p-6 hover:bg-white/90 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{item.label}</p>
                <motion.p
                  className="absolute left-0 right-0 top-full mt-2 text-gray-700 text-sm px-2 opacity-0 group-hover:opacity-100 transition-opacity origin-top"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  {item.info}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======================================================= */}
      {/* 4. Duale Realität – Das erste XP-System mit echter Auswirkung */}
      {/* ======================================================= */}
      <div className="mb-28">
        <motion.h3
          className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Duale Realität: Dein Fortschritt ist real und digital
        </motion.h3>

        <DualRealityPanel />
      </div>

      {/* ======================================================= */}
      {/* 5. Die Wissenschaft hinter Motivation & Sinn          */}
      {/* ======================================================= */}
      <div className="mb-28 max-w-3xl mx-auto">
        <motion.h3
          className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Die Wissenschaft hinter Motivation & Sinn
        </motion.h3>

        <div className="space-y-4">
          {theories.map((theory, idx) => (
            <AccordionItem
              key={idx}
              theory={theory}
              isActive={activeTheory === idx}
              onClick={() =>
                setActiveTheory(activeTheory === idx ? -1 : idx)
              }
            />
          ))}
        </div>
      </div>

      {/* ======================================================= */}
      {/* 6. Community & Sinn – Die Ultra-Dimension               */}
      {/* ======================================================= */}
      <div className="mb-28">
        <motion.h3
          className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Community & Sinn – Die Ultra-Dimension
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {communityStatements.map((stmt, idx) => (
            <motion.div
              key={idx}
              className="bg-white/80 rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <p className="text-gray-800 text-sm">{stmt}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ============================================= */}
      {/* 7. CTA: Werde Teil von IGOULTRA              */}
      {/* ============================================= */}
      <div className="text-center mb-16">
        <motion.button
          className="inline-block px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🧬 Starte jetzt deine Transformation mit IGOULTRA
        </motion.button>
      </div>
    </section>
  )
}

export default UltrascienceSection
