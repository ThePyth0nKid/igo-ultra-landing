import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />
      <Hero />
      <Mission />
      <Roadmap />
      <Community />
      <Footer />
    </div>
  )
}

export default App
