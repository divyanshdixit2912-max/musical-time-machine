'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Song } from '@/types';
import songsData from '@/data/songs.json';
import genresData from '@/data/genres.json';
import SongCard from './SongCard';

const SongSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [minEnergy, setMinEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(10);
  const songs: Song[] = songsData.songs;
  const genres = genresData.genres;

  const MOODS = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Party', 'Focus', 'Sleep'];

  const filteredSongs = songs.filter(song => {
    const matchesQuery =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some(g => song.genre.includes(g));

    const matchesMood =
      selectedMoods.length === 0 || selectedMoods.some(m => song.mood.includes(m));

    const matchesEnergy = song.energy >= minEnergy && song.energy <= maxEnergy;

    return matchesQuery && matchesGenre && matchesMood && matchesEnergy;
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedMoods([]);
    setMinEnergy(0);
    setMaxEnergy(10);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-3 gradient-text">
          <Search className="w-8 h-8" />
          Search Songs
        </h2>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search by song title, artist, or album..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-dark-secondary border border-gray-700 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
          />
        </motion.div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Genres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-4 rounded-xl"
          >
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Genres
            </h3>
            <div className="space-y-2">
              {genres.map(genre => (
                <label key={genre.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.name)}
                    onChange={() => toggleGenre(genre.name)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{genre.name}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Moods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-morphism p-4 rounded-xl"
          >
            <h3 className="font-bold mb-3">Moods</h3>
            <div className="space-y-2">
              {MOODS.map(mood => (
                <label key={mood} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMoods.includes(mood)}
                    onChange={() => toggleMood(mood)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{mood}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Energy Level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-morphism p-4 rounded-xl lg:col-span-2"
          >
            <h3 className="font-bold mb-4">Energy Level</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Min: {minEnergy}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={minEnergy}
                  onChange={e => setMinEnergy(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Max: {maxEnergy}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={maxEnergy}
                  onChange={e => setMaxEnergy(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reset Button */}
        {(searchQuery || selectedGenres.length > 0 || selectedMoods.length > 0) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={resetFilters}
            className="btn-outline flex items-center gap-2 mb-8"
          >
            <X className="w-4 h-4" />
            Reset Filters
          </motion.button>
        )}

        {/* Results */}
        <div>
          <p className="text-gray-400 mb-6">
            Found {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
          </p>
          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSongs.map((song, index) => (
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              No songs found. Try adjusting your filters!
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SongSearch;
