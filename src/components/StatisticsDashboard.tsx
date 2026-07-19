'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Music } from 'lucide-react';
import { useMusicStore } from '@/store/musicStore';

const StatisticsDashboard: React.FC = () => {
  const { userStats } = useMusicStore();
  const [showDetails, setShowDetails] = useState(false);

  const topGenres = Object.entries(userStats.favoriteGenres)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topMoods = Object.entries(userStats.favoriteMoods)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxGenreCount = Math.max(...topGenres.map(g => g[1]), 1);
  const maxMoodCount = Math.max(...topMoods.map(m => m[1]), 1);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent/10 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-3 gradient-text">
          <TrendingUp className="w-8 h-8" />
          Your Music Stats
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 rounded-xl"
          >
            <h3 className="text-gray-400 text-sm mb-2">Total Searches</h3>
            <p className="text-3xl font-bold">{userStats.totalSearches}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-morphism p-6 rounded-xl"
          >
            <h3 className="text-gray-400 text-sm mb-2">Quizzes Taken</h3>
            <p className="text-3xl font-bold">{userStats.quizTaken}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-morphism p-6 rounded-xl"
          >
            <h3 className="text-gray-400 text-sm mb-2">Favorite Genres</h3>
            <p className="text-3xl font-bold">{Object.keys(userStats.favoriteGenres).length}</p>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Genres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Music className="w-5 h-5" />
              Top Genres
            </h3>
            {topGenres.length > 0 ? (
              <div className="space-y-4">
                {topGenres.map(([genre, count], index) => (
                  <div key={genre}>
                    <div className="flex justify-between mb-2">
                      <span>{genre}</span>
                      <span className="text-gray-400">{count}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / maxGenreCount) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No data yet. Start exploring!</p>
            )}
          </motion.div>

          {/* Top Moods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold mb-6">Top Moods</h3>
            {topMoods.length > 0 ? (
              <div className="space-y-4">
                {topMoods.map(([mood, count], index) => (
                  <div key={mood}>
                    <div className="flex justify-between mb-2">
                      <span>{mood}</span>
                      <span className="text-gray-400">{count}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-secondary to-accent h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / maxMoodCount) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No data yet. Take a quiz!</p>
            )}
          </motion.div>
        </div>

        {/* Last Visited */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-400"
        >
          Last visited: {new Date(userStats.lastVisited).toLocaleDateString()}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsDashboard;
