// Song interface
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string[];
  mood: string[];
  energy: number; // 1-10
  tempo: string; // slow, medium, fast
  releaseYear: number;
  releaseDate: string;
  popularity: number; // 1-100
  spotifyUrl: string;
  imageUrl?: string;
  tags: string[];
  duration: number; // in seconds
}

// Artist interface
export interface Artist {
  id: string;
  name: string;
  genre: string[];
  imageUrl?: string;
  bio?: string;
  founded?: number;
}

// Genre interface
export interface Genre {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

// Mood interface
export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  traits: string[];
}

// Quiz Result
export interface QuizResult {
  mood: string;
  score: number;
  traits: string[];
  recommendations: Song[];
}

// Music Personality
export interface MusicPersonality {
  type: string;
  description: string;
  preferredGenres: string[];
  preferredMoods: string[];
  traits: string[];
}

// Favorite
export interface Favorite {
  songId: string;
  addedAt: number;
}

// User Statistics
export interface UserStats {
  totalSearches: number;
  favoriteGenres: Record<string, number>;
  favoriteMoods: Record<string, number>;
  quizTaken: number;
  lastVisited: number;
}
