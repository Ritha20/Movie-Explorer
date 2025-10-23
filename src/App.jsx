import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './Components/Footer'
import Home from './pages/Home'
import MovieDetails from './pages/movieDetails'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './Hooks/useFavorites'

function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </FavoritesProvider>
  )
}

export default App