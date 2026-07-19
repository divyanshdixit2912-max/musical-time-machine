'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gift, Music, TrendingUp, Award } from 'lucide-react';
import songsData from '@/data/songs.json';
import SongCard from './SongCard';

const BirthMusicExplorer: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const songs = songsData.songs;

  const handleExplore = () => {
    if (birthDate) {
      setShowResults(true);
    }
  };

  const getYearFromDate = (dateStr: string): number => {
    return parseInt(dateStr.split('-')[0]);
  };

  const getMusicFromYear = (): React.ReactNode => {
    if (!showResults || !birthDate) return null;

    const year = getYearFromDate(birthDate);
    const yearSongs = songs.filter(s => s.releaseYear === year);
    const nearbyYearSongs = songs.filter(
      s => Math.abs(s.releaseYear - year) <= 2 && s.releaseYear !== year
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Year Summary */}
        <div className="glass-morphism p-8 rounded-xl text-center">
          <h3 className="text-3xl font-bold mb-4">The Year {year}</h3>
          <p className="text-gray-300 text-lg mb-6">
            What the world was listening to when you were born
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Songs Found</p>
              <p className="text-2xl font-bold">{yearSongs.length + nearbyYearSongs.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Top Genre</p>
              <p className="text-2xl font-bold">Various</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Era</p>
              <p className="text-2xl font-bold">{Math.ceil(year / 10) * 10}s</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Popularity</p>
              <p className="text-2xl font-bold">85</p>
            </div>
          </div>
        </div>

        {/* Songs from Birth Year */}
        {yearSongs.length > 0 && (
          <div>
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Music className="w-6 h-6" />
              Hits from {year}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {yearSongs.slice(0, 8).map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard song={song} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Year Songs */}
        {nearbyYearSongs.length > 0 && (
          <div>
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Music from Around {year}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyYearSongs.slice(0, 8).map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard song={song} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-morphism p-8 rounded-xl"
        >
          <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Fun Fact from {year}
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {year} was an iconic year in music history. Many classic hits were released during this period,
            shaping the sound of a generation. The music industry was evolving rapidly, with new genres
            gaining popularity and artists experimenting with fresh sounds.
          </p>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="birth" className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-3 gradient-text">
          <Calendar className="w-8 h-8" />
          Birth Music Explorer
        </h2>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-gray-300 mb-8 text-lg">
              Discover what songs were popular when you were born!
            </p>

            <div className="glass-morphism p-8 rounded-xl">
              <label className="block text-left mb-4">
                <span className="text-sm font-semibold text-gray-300 mb-2 block">Your Birth Year</span>
                <input
                  type="number"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  placeholder="Enter your birth year"
                  className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                />
              </label>

              <button
                onClick={handleExplore}
                disabled={!birthDate}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Gift className="w-5 h-5" />
                Explore My Music
              </button>
            </div>
          </motion.div>
        ) : (
          <div>
            {getMusicFromYear()}
            <div className="text-center mt-12">
              <button
                onClick={() => setShowResults(false)}
                className="btn-outline"
              >
                Try Another Year
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BirthMusicExplorer;
