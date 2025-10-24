import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../API/api'
import { useFavorites } from '../Hooks/useFavorites'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.getShowById(id)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl text-gray-400">Loading movie details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl text-primary">Error: {error}</div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl text-gray-400">Movie not found.</div>
      </div>
    )
  }

  const posterUrl = movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=No+Image'

  return (
    <div className="movie-details py-8">
      <button 
        onClick={handleBack} 
        className="bg-gray-700 text-white px-6 py-3 rounded-lg mb-8 hover:bg-gray-600 transition-colors"
      >
        ← Back
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={posterUrl}
            alt={movie.name}
            className="w-full rounded-xl shadow-2xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=No+Image'
            }}
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{movie.name}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-400">
            {movie.premiered && (
              <span>Released: {new Date(movie.premiered).getFullYear()}</span>
            )}
            {movie.runtime && (
              <span>Runtime: {movie.runtime} min</span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <strong className="text-white">Genres: </strong>
              <span className="text-gray-300">{movie.genres.join(', ')}</span>
            </div>
          )}

          {movie.summary && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Overview</h3>
              <div 
                className="text-gray-300 leading-relaxed prose prose-invert"
                dangerouslySetInnerHTML={{ __html: movie.summary }}
              />
            </div>
          )}

          {/* favorite an icon */}
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isFavorite(movie.id) 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-primary text-white hover:bg-red-700'
            }`}
            onClick={() => toggleFavorite(movie)}
          >
            {isFavorite(movie.id) ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Remove from Favorites
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails