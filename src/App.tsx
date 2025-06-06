import React from "react"
import { Routes, Route } from "react-router-dom"
import Hero from "./components/Hero"
import Mission from "./components/Mission"
import UltraFitSection from "@/components/ultra-paths/UltraFitSection"
import UltraMindSection from "@/components/ultra-paths/UltraMindSection"
import UltraSpiritSection from "@/components/ultra-paths/UltraSpiritSection"
import UltraWorldSection from "./components/ultra-paths/UltraWorldSection"
import UltrascienceSection from "./components/ultra-paths/UltrascienceSection"
import Roadmap from "./components/Roadmap"
import Community from "./components/Community"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import DiscordCallback from "./pages/DiscordCallback"
import Onboarding from "./pages/Onboarding"
import PrivateRoute from "./components/auth/PrivateRoute"
import LayoutWithNavbar from "./components/layout/LayoutWithNavbar"

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            <LayoutWithNavbar>
              <Hero />
              <Mission />
              <UltraFitSection />
              <UltraMindSection />
              <UltraSpiritSection />
              <UltraWorldSection />
              <UltrascienceSection />
              <Roadmap />
              <Community />
              <Footer />
            </LayoutWithNavbar>
          }
        />

        {/* OAuth2 callback after Discord login */}
        <Route path="/discord/callback" element={<DiscordCallback />} />

        {/* One-time onboarding step for new users */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected dashboard for logged-in users with completed profile */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <Dashboard />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />

        {/* Catch-all fallback route */}
        <Route path="*" element={<div className="p-10">404 – Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
