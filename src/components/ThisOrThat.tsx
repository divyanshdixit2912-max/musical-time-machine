'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { volume2, Headphones } from 'lucide-react';
import { Song } from '@/types';
import SongCard from './SongCard';
import songsData from '@/data/songs.json';
import { getRandomItems } from '@/utils/helpers';

const ThisOrThat: React.FC = () => {
  const [songA, setSongA] = useState<Song | null>(null);
  const [songB, setSongB] = useState<Song | null>(null);
  const [round, setRound] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const songs: Song[] = songsData.songs;

  const initializeRound = () => {
    const selected = getRandomItems(songs, 2);
    setSongA(selected[0]);
    setSongB(selected[1]);
  };

  useEffect(() => {
    initializeRound();
  }, []);

  const handleChoice = (chosenSong: Song) => {
    setSelectedGenres([...selectedGenres, ...chosenSong.genre]);

    if (round >= 10) {
      setGameComplete(true);
    } else {
      setRound(round + 1);
      initializeRound();
    }
  };

  const resetGame = () => {
    setRound(1);
    setSelectedGenres([]);
    setGameComplete(false);
    initializeRound();
  };

  if (!songA || !songB) return null;

  return (
    <section className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text flex items-center justify-center gap-2">
          <Headphones className="w-8 h-8" />
          This or That
        </h2>

        <AnimatePresence mode="wait">
          {!gameComplete ? (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Round Counter */}
              <div className="flex justify-center">
                <div className="glass-morphism px-6 py-3 rounded-full">
                  <p className="text-lg font-semibold">
                    Round {round} of 10
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(round / 10) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Song Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleChoice(songA)}
                  className="text-left"
                >
                  <SongCard song={songA} />
                </motion.button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center"
                >
                  <div className="text-3xl font-bold text-gray-500">VS</div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleChoice(songB)}
                  className="text-left md:col-start-2 md:row-start-1"
                >
                  <SongCard song={songB} />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold mb-6">Game Complete!</h3>
              <div className="glass-morphism p-8 rounded-xl mb-8 max-w-2xl mx-auto">
                <p className="text-gray-300 mb-4">Based on your choices, your music taste leans towards:</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold"
                    >
                      {selectedGenres[i] || 'Mystery'}
                    </motion.span>
                  ))}
                </div>
              </div>
              <button onClick={resetGame} className="btn-primary">
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ThisOrThat;
