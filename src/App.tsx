import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />

      <Routes>
        {/* Landing Page */}
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

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔥 Ultra Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Optional: Fallback */}
        <Route path="*" element={<div className="p-10">404 – Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
