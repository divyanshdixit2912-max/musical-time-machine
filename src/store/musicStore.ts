import { create } from 'zustand';
import { Song, UserStats, Favorite } from '@/types';
import { storage } from '@/utils/storage';

interface MusicStore {
  favorites: Favorite[];
  recentlyViewed: Song[];
  userStats: UserStats;
  darkMode: boolean;

  // Favorites
  addFavorite: (songId: string) => void;
  removeFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  loadFavorites: () => void;
  saveFavorites: () => void;

  // Recently viewed
  addToRecentlyViewed: (song: Song) => void;
  clearRecentlyViewed: () => void;

  // Stats
  incrementGenreSearch: (genre: string) => void;
  incrementMoodSearch: (mood: string) => void;
  incrementQuizTaken: () => void;
  updateLastVisited: () => void;
  loadStats: () => void;
  saveStats: () => void;

  // Theme
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const initialStats: UserStats = {
  totalSearches: 0,
  favoriteGenres: {},
  favoriteMoods: {},
  quizTaken: 0,
  lastVisited: Date.now(),
};

export const useMusicStore = create<MusicStore>((set, get) => ({
  favorites: [],
  recentlyViewed: [],
  userStats: initialStats,
  darkMode: true,

  addFavorite: (songId: string) => {
    set(state => {
      const exists = state.favorites.some(fav => fav.songId === songId);
      if (!exists) {
        return {
          favorites: [
            ...state.favorites,
            { songId, addedAt: Date.now() },
          ],
        };
      }
      return state;
    });
    get().saveFavorites();
  },

  removeFavorite: (songId: string) => {
    set(state => ({
      favorites: state.favorites.filter(fav => fav.songId !== songId),
    }));
    get().saveFavorites();
  },

  isFavorite: (songId: string) => {
    return get().favorites.some(fav => fav.songId === songId);
  },

  loadFavorites: () => {
    const saved = storage.getItem('favorites', []);
    set({ favorites: saved });
  },

  saveFavorites: () => {
    storage.setItem('favorites', get().favorites);
  },

  addToRecentlyViewed: (song: Song) => {
    set(state => {
      const filtered = state.recentlyViewed.filter(s => s.id !== song.id);
      return {
        recentlyViewed: [song, ...filtered].slice(0, 20),
      };
    });
  },

  clearRecentlyViewed: () => {
    set({ recentlyViewed: [] });
  },

  incrementGenreSearch: (genre: string) => {
    set(state => ({
      userStats: {
        ...state.userStats,
        favoriteGenres: {
          ...state.userStats.favoriteGenres,
          [genre]: (state.userStats.favoriteGenres[genre] || 0) + 1,
        },
        totalSearches: state.userStats.totalSearches + 1,
      },
    }));
    get().saveStats();
  },

  incrementMoodSearch: (mood: string) => {
    set(state => ({
      userStats: {
        ...state.userStats,
        favoriteMoods: {
          ...state.userStats.favoriteMoods,
          [mood]: (state.userStats.favoriteMoods[mood] || 0) + 1,
        },
      },
    }));
    get().saveStats();
  },

  incrementQuizTaken: () => {
    set(state => ({
      userStats: {
        ...state.userStats,
        quizTaken: state.userStats.quizTaken + 1,
      },
    }));
    get().saveStats();
  },

  updateLastVisited: () => {
    set(state => ({
      userStats: {
        ...state.userStats,
        lastVisited: Date.now(),
      },
    }));
  },

  loadStats: () => {
    const saved = storage.getItem('userStats', initialStats);
    set({ userStats: saved });
  },

  saveStats: () => {
    storage.setItem('userStats', get().userStats);
  },

  toggleDarkMode: () => {
    set(state => {
      const newMode = !state.darkMode;
      storage.setItem('darkMode', newMode);
      return { darkMode: newMode };
    });
  },

  setDarkMode: (value: boolean) => {
    set({ darkMode: value });
    storage.setItem('darkMode', value);
  },
}));
