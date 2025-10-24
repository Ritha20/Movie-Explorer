import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../Hooks/useFavorites'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    
    if (!isFavorite(movie.id)) {
      const confirmAdd = window.confirm(`Are you sure you want to add "${movie.name}" to favorites?`)
      if (!confirmAdd) {
        return
      }
    }
    
    toggleFavorite(movie)
  }

  const posterUrl = movie.image?.medium || movie.image?.original || 'https://via.placeholder.com/210x295/1a1a1a/ffffff?text=No+Image'

  return (
    <figure 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      onClick={handleCardClick}
    >
      <div className="relative"> 
        <img
          src={posterUrl}
          alt={movie.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/210x295/1a1a1a/ffffff?text=No+Image'
          }}
        />
        <button
          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          onClick={handleFavoriteClick}
        >
          {isFavorite(movie.id) ? (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      
      <figcaption className="p-3">
        <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">{movie.name}</h3>
        
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            {movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A'}
          </p>
          
          {movie.rating?.average && (
            <p className="text-yellow-500 text-xs font-medium">⭐ {movie.rating.average}</p>
          )}
        </div>
      </figcaption>
    </figure>
  )
}

export default MovieCard