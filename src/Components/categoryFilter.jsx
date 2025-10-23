import React from 'react'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="min-w-[200px]">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg bg-cyan-950 text-white focus:outline-none focus:border-primary cursor-pointer"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter