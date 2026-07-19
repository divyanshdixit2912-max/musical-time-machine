'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Share2, Download } from 'lucide-react';

interface PersonalityCardProps {
  name?: string;
  favoriteGenre?: string;
  musicPersonality?: string;
  topMood?: string;
  decade?: string;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({
  name = 'Music Lover',
  favoriteGenre = 'Pop',
  musicPersonality = 'Explorer',
  topMood = 'Happy',
  decade = '2020s',
}) => {
  const [showShare, setShowShare] = useState(false);

  const handleShare = () => {
    const text = `I'm a ${musicPersonality} who loves ${favoriteGenre} music! My mood is ${topMood}. Check out MelodyVerse to discover your music personality!`;
    if (navigator.share) {
      navigator.share({
        title: 'My Music Personality',
        text,
      });
    } else {
      setShowShare(true);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    alert('Personality card saved! (In a real app, this would download as image)');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      {/* Card */}
      <div className="gradient-bg rounded-2xl p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-white/80">Music Personality Profile</p>
          </div>
          <Music className="w-16 h-16 opacity-30" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-2">Favorite Genre</p>
            <p className="text-2xl font-bold">{favoriteGenre}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-2">Music Personality</p>
            <p className="text-2xl font-bold">{musicPersonality}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-2">Current Mood</p>
            <p className="text-2xl font-bold">{topMood}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-2">Favorite Decade</p>
            <p className="text-2xl font-bold">{decade}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/20 pt-6 flex gap-4">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg py-2 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg py-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
      </div>

      {/* Share Options */}
      {showShare && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass-morphism p-4 rounded-lg"
        >
          <p className="text-sm text-gray-300">Share your music personality!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PersonalityCard;
