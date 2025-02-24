'use client';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="h-4 w-4 text-yellow-500" />
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none"
        style={{ 
          backgroundColor: theme === 'dark' ? '#3b82f6' : '#d1d5db' 
        }}
      >
        <span 
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-500 ease-in-out"
          style={{ 
            transform: theme === 'dark' ? 'translateX(1.25rem)' : 'translateX(0.25rem)' 
          }}
        />
      </button>
      <MoonIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    </div>
  );
}
