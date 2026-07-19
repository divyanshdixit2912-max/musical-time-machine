import { Song } from '@/types';
import { calculateSimilarity } from './helpers';

/**
 * Recommend songs based on genre and mood
 */
export const recommendByGenreAndMood = (
  songs: Song[],
  genres: string[],
  moods: string[],
  limit: number = 10
): Song[] => {
  const scored = songs.map(song => {
    let score = 0;

    // Genre match
    const genreMatch = song.genre.some(g => genres.includes(g)) ? 1 : 0;
    score += genreMatch * 40;

    // Mood match
    const moodMatch = song.mood.some(m => moods.includes(m)) ? 1 : 0;
    score += moodMatch * 40;

    // Popularity
    score += (song.popularity / 100) * 20;

    return { song, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.song);
};

/**
 * Recommend similar songs
 */
export const recommendSimilarSongs = (
  targetSong: Song,
  allSongs: Song[],
  limit: number = 10
): Song[] => {
  const scored = allSongs
    .filter(song => song.id !== targetSong.id)
    .map(song => {
      let score = 0;

      // Genre similarity
      const genreSimilarity = calculateSimilarity(targetSong.genre, song.genre);
      score += genreSimilarity * 40;

      // Mood similarity
      const moodSimilarity = calculateSimilarity(targetSong.mood, song.mood);
      score += moodSimilarity * 40;

      // Energy similarity
      const energyDiff = Math.abs(targetSong.energy - song.energy);
      const energySimilarity = 1 - energyDiff / 10;
      score += energySimilarity * 20;

      return { song, score };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.song);
};

/**
 * Recommend based on energy level
 */
export const recommendByEnergy = (
  songs: Song[],
  energy: number,
  limit: number = 10
): Song[] => {
  const energyRange = 1.5;
  const minEnergy = Math.max(1, energy - energyRange);
  const maxEnergy = Math.min(10, energy + energyRange);

  return songs
    .filter(song => song.energy >= minEnergy && song.energy <= maxEnergy)
    .sort((a, b) => Math.abs(a.energy - energy) - Math.abs(b.energy - energy))
    .slice(0, limit);
};

/**
 * Get trending songs (high popularity from recent years)
 */
export const getTrendingSongs = (
  songs: Song[],
  limit: number = 10
): Song[] => {
  const currentYear = new Date().getFullYear();
  const recentThreshold = currentYear - 3;

  return songs
    .filter(song => song.releaseYear >= recentThreshold)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

/**
 * Get classic songs from a specific era
 */
export const getClassicsByEra = (
  songs: Song[],
  startYear: number,
  endYear: number,
  limit: number = 10
): Song[] => {
  return songs
    .filter(song => song.releaseYear >= startYear && song.releaseYear <= endYear)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

/**
 * Hidden gems algorithm - high quality but lower popularity
 */
export const getHiddenGems = (
  songs: Song[],
  limit: number = 10
): Song[] => {
  return songs
    .filter(song => song.popularity >= 40 && song.popularity <= 70)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

/**
 * Daily recommendation - deterministic based on date
 */
export const getDailyRecommendation = (
  songs: Song[],
  date: Date = new Date()
): Song => {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      86400000
  );
  const index = dayOfYear % songs.length;
  return songs[index];
};
