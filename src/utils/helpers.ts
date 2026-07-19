import { Song } from '@/types';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get random items from array
 */
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Format duration (seconds to MM:SS)
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get color based on energy level
 */
export const getEnergyColor = (energy: number): string => {
  if (energy <= 3) return 'text-blue-500';
  if (energy <= 6) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Calculate similarity between two arrays
 */
export const calculateSimilarity = (arr1: string[], arr2: string[]): number => {
  const intersection = arr1.filter(item => arr2.includes(item));
  const union = [...new Set([...arr1, ...arr2])];
  return union.length === 0 ? 0 : intersection.length / union.length;
};

/**
 * Get year from date string
 */
export const getYear = (dateString: string): number => {
  return parseInt(dateString.split('-')[0]);
};

/**
 * Format date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
