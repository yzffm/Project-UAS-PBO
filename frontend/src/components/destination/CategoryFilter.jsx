import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {/* "All" Category */}
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
          selectedCategory === 'All'
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
        }`}
      >
        Semua
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
            selectedCategory === cat
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
              : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;