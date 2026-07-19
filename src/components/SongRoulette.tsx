'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Shuffle, ChevronRight } from 'lucide-react';
import { Song } from '@/types';
import { getRandomItems } from '@/utils/helpers';
import songsData from '@/data/songs.json';

const SongRoulette: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const songs: Song[] = songsData.songs;

  const spinWheel = () => {
    setIsSpinning(true);
    // Animate multiple spins
    let spins = 0;
    const interval = setInterval(() => {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(randomSong);
      spins++;
      if (spins > 20) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 50);
  };

  useEffect(() => {
    spinWheel();
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center justify-center gap-2 gradient-text">
          <Shuffle className="w-8 h-8" />
          Song Roulette
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          Surprise yourself with a random song recommendation!
        </p>

        {/* Spinning Animation */}
        <motion.div
          animate={isSpinning ? { rotate: 360 } : {}}
          transition={{
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
          }}
          className="mb-12"
        >
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
            {currentSong && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSong.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="text-center"
                >
                  <Music className="w-16 h-16 text-white mx-auto mb-4" />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Current Song Info */}
        <AnimatePresence mode="wait">
          {currentSong && (
            <motion.div
              key={currentSong.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-morphism p-8 rounded-xl mb-8"
            >
              <h3 className="text-2xl font-bold mb-2">{currentSong.title}</h3>
              <p className="text-gray-300 mb-4">{currentSong.artist}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentSong.mood.map((mood) => (
                  <span
                    key={mood}
                    className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="btn-primary flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-5 h-5" />
          Surprise Me
        </button>
      </div>
    </section>
  );
};

export default SongRoulette;
