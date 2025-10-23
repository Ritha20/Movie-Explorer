import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { favorites } = useFavorites()

  return (
    <nav className="bg-cyan-950 border-b-2 border-primary py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          MovieExplorer
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="text-white hover:text-primary transition-colors">
              Favorites ({favorites.length})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar