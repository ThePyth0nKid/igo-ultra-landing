import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup' // Ensure this file exists in the ./pages/ directory

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />

      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Mission />
              <Roadmap />
              <Community />
              <Footer />
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Optional: Fallback */}
        <Route path="*" element={<div className="p-10">404 – Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
