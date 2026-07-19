'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gift, TrendingUp, Award } from 'lucide-react';
import { getDailyRecommendation } from '@/utils/algorithms';
import songsData from '@/data/songs.json';
import SongCard from './SongCard';

const DailyRecommendation: React.FC = () => {
  const songs = songsData.songs;
  const dailySong = getDailyRecommendation(songs);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => setClaimed(false), 2000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Gift className="w-8 h-8 text-secondary" />
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Daily Recommendation</h2>
          <Gift className="w-8 h-8 text-secondary" />
        </div>

        <p className="text-center text-gray-300 mb-12 text-lg">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <SongCard song={dailySong} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-6 rounded-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-4">Why This Song?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <span>High popularity score</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 mt-1 text-secondary flex-shrink-0" />
                  <span>Highly rated by community</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span>Selected by daily algorithm</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleClaim}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition-all ${
                claimed
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-primary text-white hover:bg-primary/80'
              }`}
            >
              {claimed ? '✓ Added to queue' : 'Claim This Song'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DailyRecommendation;
