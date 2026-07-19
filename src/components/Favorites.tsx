'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Heart } from 'lucide-react';
import { storage } from '@/utils/storage';

interface Favorite {
  songId: string;
  addedAt: number;
}

const FavoritesPage: React.FC = () => {
  const [favorites] = useState<Favorite[]>(
    storage.getItem('favorites', [])
  );

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 flex items-center gap-3 gradient-text">
          <Heart className="w-10 h-10" />
          My Favorites
        </h1>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Book className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">
              No favorites yet. Start exploring to add songs to your favorites!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-gray-300 mb-6">
              You have {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
