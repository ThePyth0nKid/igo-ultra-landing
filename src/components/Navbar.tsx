import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-800 z-50 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-ultra-red">iGoUltra</div>
      <div className="space-x-4 text-sm">
        <a href="#mission" className="hover:text-ultra-red">Mission</a>
        <a href="#roadmap" className="hover:text-ultra-red">Roadmap</a>
        <a href="#community" className="hover:text-ultra-red">Community</a>
      </div>
    </nav>
  )
}

export default Navbar
