import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../Hooks/useFavorites'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { favorites } = useFavorites()

  return (
    <nav className="bg-white dark:bg-gray-800 border-b-2 border-red-600 py-4 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          MovieExplorer
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-700 dark:text-white hover:text-red-600 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-gray-700 dark:text-white hover:text-red-600 transition-colors font-medium">
                Favorites ({favorites.length})
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar