import { useEffect } from 'react';
import { useMusicStore } from '@/store/musicStore';

export const useFavorites = () => {
  const store = useMusicStore();

  useEffect(() => {
    store.loadFavorites();
    store.loadStats();
  }, []);

  return {
    favorites: store.favorites,
    isFavorite: store.isFavorite,
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
  };
};
