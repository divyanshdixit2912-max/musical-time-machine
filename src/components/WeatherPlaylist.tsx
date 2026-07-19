'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Cloud, UCloud } from 'lucide-react';
import songsData from '@/data/songs.json';
import SongCard from './SongCard';
import { Song } from '@/types';

const WEATHER_TYPES = [
  { id: 'rain', name: 'Rain', icon: Cloud, color: 'from-blue-400 to-blue-600' },
  { id: 'sunny', name: 'Sunny', icon: MapPin, color: 'from-yellow-400 to-yellow-600' },
  { id: 'night', name: 'Night', icon: Clock, color: 'from-purple-400 to-purple-600' },
  { id: 'cafe', name: 'Cafe', icon: UCloud, color: 'from-amber-400 to-amber-600' },
];

const WeatherPlaylist: React.FC = () => {
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const songs: Song[] = songsData.songs;

  const getPlaylistForWeather = (weather: string): Song[] => {
    const moodMap: Record<string, string[]> = {
      rain: ['Calm', 'Sad', 'Reflective'],
      sunny: ['Happy', 'Energetic', 'Party'],
      night: ['Calm', 'Sleep', 'Romantic'],
      cafe: ['Focus', 'Calm', 'Relaxed'],
    };

    const moods = moodMap[weather] || [];
    return songs.filter(song =>
      song.mood.some(m => moods.includes(m))
    ).slice(0, 6);
  };

  const playlist = selectedWeather ? getPlaylistForWeather(selectedWeather) : [];

  return (
    <section className="py-20 px-4 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          Weather Playlist
        </h2>

        {/* Weather Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {WEATHER_TYPES.map((weather) => {
            const Icon = weather.icon;
            const isSelected = selectedWeather === weather.id;

            return (
              <motion.button
                key={weather.id}
                onClick={() => setSelectedWeather(weather.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-br ${weather.color} text-white scale-105`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">{weather.name}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Playlist Display */}
        <AnimatePresence mode="wait">
          {selectedWeather && playlist.length > 0 ? (
            <motion.div
              key={selectedWeather}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-2xl font-bold mb-8">
                {playlist.length} songs for {WEATHER_TYPES.find(w => w.id === selectedWeather)?.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlist.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SongCard song={song} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : selectedWeather ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              No songs found for this weather. Try another!
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WeatherPlaylist;
