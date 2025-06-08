import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}