import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Mission from "./components/Mission"
import Roadmap from "./components/Roadmap"
import Community from "./components/Community"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import DiscordCallback from "./pages/DiscordCallback"
import Onboarding from "./pages/Onboarding"
import PrivateRoute from "./components/auth/PrivateRoute"

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />

      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            <div className="relative">
              <Hero />
              <Mission />
              <Roadmap />
              <Community />
              <Footer />
            </div>
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
              <Dashboard />
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
