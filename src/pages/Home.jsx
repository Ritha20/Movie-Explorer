import React, { useState, useMemo } from 'react'
import useFetchMovies from '../Hooks/fetchmovies'
import { getUniqueGenres } from '../utils/api'
import SearchBar from '../Components/searchBar'
import CategoryFilter from '../Components/categoryFilter'
import MovieCard from '../Components/MovieCard'
import HeroCarousel from '../Components/HeroCarousel'

const Home = () => {
  const { movies, loading, error } = useFetchMovies()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => getUniqueGenres(movies), [movies])

  // Get featured movies (first 5 movies with images)
  const featuredMovies = useMemo(() => {
    return movies
      .filter(movie => movie.image?.original || movie.image?.medium)
      .slice(0, 5)
  }, [movies])

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || 
        (movie.genres && movie.genres.includes(selectedCategory))
      
      return matchesSearch && matchesCategory
    })
  }, [movies, searchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading movies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="home">
      {/* Hero Carousel with Featured Movies */}
      {featuredMovies.length > 0 && <HeroCarousel featuredMovies={featuredMovies} />}
      
      {/* Movies Section */}
      <section id="movies-section" className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16 text-gray-600 dark:text-gray-400 text-xl">
            {searchTerm || selectedCategory !== 'All' 
              ? 'No movies found matching your criteria.' 
              : 'No movies available.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home