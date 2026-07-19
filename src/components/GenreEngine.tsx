'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Indie', 'Electronic', 'Jazz', 'Blues',
  'Classical', 'R&B', 'Country', 'Reggae', 'Punk', 'Metal', 'Folk',
];

const MOODS = [
  'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Motivating',
  'Relaxing', 'Party', 'Focus', 'Sleep',
];

const GenreEngine: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  return (
    <section id="genres" className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          Discover by Genre & Mood
        </h2>

        {/* Genre Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            Select Genres
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {GENRES.map((genre, index) => (
              <motion.button
                key={genre}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleGenre(genre)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  selectedGenres.includes(genre)
                    ? 'bg-primary text-white scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Select Moods</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOODS.map((mood, index) => (
              <motion.button
                key={mood}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleMood(mood)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  selectedMoods.includes(mood)
                    ? 'bg-secondary text-white scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recommendation Categories */}
        {(selectedGenres.length > 0 || selectedMoods.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {['Top Picks', 'Hidden Gems', 'Trending', 'Classics', 'Underrated'].map(
                (category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="card py-6 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/60"
                  >
                    <p className="font-semibold text-lg">{category}</p>
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GenreEngine;
