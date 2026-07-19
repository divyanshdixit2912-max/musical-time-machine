'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, RotateCcw, Music } from 'lucide-react';
import { Song } from '@/types';
import { getRandomItems } from '@/utils/helpers';
import songsData from '@/data/songs.json';

const GuessSong: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const songs: Song[] = songsData.songs;
  const gameSongs = getRandomItems(songs, 10);

  const currentSong = gameSongs[currentSongIndex];
  const incorrectOptions = songs
    .filter(s => s.id !== currentSong.id)
    .slice(0, 3)
    .map(s => s.title);
  const allOptions = [
    { text: currentSong.title, correct: true },
    ...incorrectOptions.map(text => ({ text, correct: false })),
  ].sort(() => Math.random() - 0.5);

  const handleGuess = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAttempts(attempts + 1);

    if (currentSongIndex + 1 < gameSongs.length) {
      setTimeout(() => setCurrentSongIndex(currentSongIndex + 1), 500);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentSongIndex(0);
    setScore(0);
    setAttempts(0);
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Guess The Song</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Can you identify the song by its details? Test your music knowledge!
            </p>
            <button
              onClick={() => setGameStarted(true)}
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
              <Music className="w-5 h-5" />
              Start Game
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (gameOver) {
    return (
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Game Over!</h2>
          <div className="glass-morphism p-8 rounded-xl mb-8">
            <p className="text-gray-300 mb-4">Final Score</p>
            <p className="text-6xl font-bold gradient-text mb-4">{score}</p>
            <p className="text-gray-400">{score} out of {attempts} correct</p>
            <p className="text-sm text-gray-500 mt-4">
              Accuracy: {Math.round((score / attempts) * 100)}%
            </p>
          </div>
          <button
            onClick={resetGame}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Question {currentSongIndex + 1} of {gameSongs.length}</span>
            <span className="text-sm text-gray-400">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSongIndex + 1) / gameSongs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Song Info Card */}
        <motion.div
          key={currentSong.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism p-8 rounded-xl mb-8 text-center"
        >
          <p className="text-gray-400 mb-4">Artist</p>
          <p className="text-3xl font-bold mb-6">{currentSong.artist}</p>
          <p className="text-gray-400 mb-2">Album</p>
          <p className="text-xl mb-6">{currentSong.album}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {currentSong.genre.map(g => (
              <span key={g} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          <p className="text-gray-400 text-center mb-4">What is this song called?</p>
          <AnimatePresence>
            {allOptions.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleGuess(option.correct)}
                className="p-4 glass-morphism rounded-xl text-left hover:border-primary/60 border border-gray-700 transition-all hover:scale-105"
              >
                <p className="font-semibold">{option.text}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GuessSong;
