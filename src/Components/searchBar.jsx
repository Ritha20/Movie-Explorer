import React from 'react'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg bg-dark-gray text-black dark:text-white focus:outline-none focus:border-primary"
      />
    </div>
  )
}

export default SearchBar