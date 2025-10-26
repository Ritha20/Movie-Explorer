import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroCarousel = ({ featuredMovies }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [featuredMovies.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
  }

  if (!featuredMovies || featuredMovies.length === 0) return null

  const currentMovie = featuredMovies[currentSlide]
  const posterUrl = currentMovie.image?.original || currentMovie.image?.medium || 'https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=No+Image'

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      
      <div className="absolute inset-0">
        <img
          src={posterUrl}
          alt={currentMovie.name}
          className="w-full h-full object-cover object-top transform scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=No+Image'
          }}
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-8 md:pb-12 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Movie Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentMovie.name}
            </h1>
            
            {/* Movie Details */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-black">
              {/* Rating */}
              {currentMovie.rating?.average && (
                <div className="flex items-center bg-yellow-500 bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold">⭐ {currentMovie.rating.average}/10</span>
                </div>
              )}
              
              {/* Year */}
              {currentMovie.premiered && (
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-sm">{new Date(currentMovie.premiered).getFullYear()}</span>
                </div>
              )}
              
              {/* Genres */}
              {currentMovie.genres && currentMovie.genres.length > 0 && (
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-sm">{currentMovie.genres.slice(0, 2).join(', ')}</span>
                </div>
              )}
            </div>
            
            {/* Summary - Limited to 2 lines */}
            {currentMovie.summary && (
              <div 
                className="text-gray-200 text-lg mb-6 line-clamp-2 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: currentMovie.summary.replace(/<[^>]*>/g, '').slice(0, 150) + '...' 
                }}
              />
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  navigate('/')
                  // Scroll to movies section after a brief delay
                  setTimeout(() => {
                    const moviesSection = document.getElementById('movies-section')
                    if (moviesSection) {
                      moviesSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Explore All Movies
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-opacity-50 hover:bg-black text-white p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-opacity-50 hover:bg-black text-white p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-red-600 scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel