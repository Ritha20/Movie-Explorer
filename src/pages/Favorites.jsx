import React from 'react'
import { useFavorites } from '../Hooks/useFavorites'
import MovieCard from '../Components/movieCard'

const Favorites = () => {
  const { favorites } = useFavorites()

  return (
    <div className="favorites">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">My Favorite Movies</h1>
        <p className="text-gray-400 text-sm">
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in favorites
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-xl">
          You haven't added any movies to favorites yet.
        </div>
      ) : (
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites