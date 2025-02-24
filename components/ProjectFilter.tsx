'use client';

import { motion } from 'framer-motion';

interface FilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
  currentFilter: string;
}

export default function ProjectFilter({ categories, onFilterChange, currentFilter }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full ${
            currentFilter === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
