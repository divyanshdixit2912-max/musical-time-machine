import { useMemo } from 'react';
import { Song } from '@/types';
import {
  recommendByGenreAndMood,
  recommendSimilarSongs,
  getTrendingSongs,
  getHiddenGems,
} from '@/utils/algorithms';

export const useRecommendations = (songs: Song[]) => {
  const getByGenreAndMood = useMemo(
    () => (genres: string[], moods: string[], limit?: number) =>
      recommendByGenreAndMood(songs, genres, moods, limit),
    [songs]
  );

  const getSimilar = useMemo(
    () => (song: Song, limit?: number) =>
      recommendSimilarSongs(song, songs, limit),
    [songs]
  );

  const getTrending = useMemo(
    () => (limit?: number) => getTrendingSongs(songs, limit),
    [songs]
  );

  const getHiddenGemsRecommendation = useMemo(
    () => (limit?: number) => getHiddenGems(songs, limit),
    [songs]
  );

  return {
    getByGenreAndMood,
    getSimilar,
    getTrending,
    getHiddenGemsRecommendation,
  };
};
