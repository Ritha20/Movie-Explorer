import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'


function App() {
  return (
    
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            
          </Routes>
        </main>
      </div>
    
  )
}

export default App