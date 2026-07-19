'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Play } from 'lucide-react';
import { Song } from '@/types';
import { useMusicStore } from '@/store/musicStore';

interface SongCardProps {
  song: Song;
  onPlay?: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPlay }) => {
  const { isFavorite, addFavorite, removeFavorite } = useMusicStore();
  const [isHovered, setIsHovered] = useState(false);
  const favorited = isFavorite(song.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(song.id);
    } else {
      addFavorite(song.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group card cursor-pointer overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-800 aspect-square">
        {song.imageUrl ? (
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-4xl">
            ♪
          </div>
        )}

        {/* Overlay Actions */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-3"
          >
            <button
              onClick={onPlay}
              className="p-3 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors"
              aria-label="Play song"
            >
              <Play className="w-5 h-5" />
            </button>
            <button
              onClick={handleFavoriteClick}
              className="p-3 bg-secondary rounded-full text-white hover:bg-secondary/80 transition-colors"
              aria-label="Add to favorites"
            >
              <Heart
                className="w-5 h-5"
                fill={favorited ? 'currentColor' : 'none'}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(song.spotifyUrl, '_blank');
              }}
              className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
              aria-label="Open in Spotify"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Song Info */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>

        {/* Genre & Mood Tags */}
        <div className="flex flex-wrap gap-1 pt-2">
          {song.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Energy Level */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-gray-400">Energy:</span>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${
                  i < song.energy ? 'bg-secondary' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Favorite Badge */}
      {favorited && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-secondary rounded-full p-2"
        >
          <Heart className="w-4 h-4 text-white fill-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
