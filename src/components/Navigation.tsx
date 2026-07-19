'use client';

import React from 'react';
import { Music, Moon, Sun } from 'lucide-react';
import { useMusicStore } from '@/store/musicStore';

const Navigation: React.FC = () => {
  const { darkMode, toggleDarkMode } = useMusicStore();

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-primary" />
          <span className="text-2xl font-bold gradient-text">MelodyVerse</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#genres" className="hover:text-primary transition-colors">
            Genres
          </a>
          <a href="#birth" className="hover:text-primary transition-colors">
            Birth Music
          </a>
          <a href="#mood" className="hover:text-primary transition-colors">
            Mood Quiz
          </a>
          <a href="#personality" className="hover:text-primary transition-colors">
            Personality
          </a>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-purple-400" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
