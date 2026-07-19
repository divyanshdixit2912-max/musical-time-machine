'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, RotateCcw } from 'lucide-react';
import { Song } from '@/types';
import { recommendByGenreAndMood } from '@/utils/algorithms';
import songsData from '@/data/songs.json';
import SongCard from './SongCard';

interface PersonalityQuestion {
  id: string;
  question: string;
  options: Array<{
    text: string;
    personality: string;
    genres: string[];
  }>;
}

const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: '1',
    question: 'How do you approach new music?',
    options: [
      { text: 'Always exploring new sounds', personality: 'Explorer', genres: ['Indie', 'Electronic', 'Experimental'] },
      { text: 'Follow my gut feeling', personality: 'Dreamer', genres: ['Alternative', 'Indie', 'Folk'] },
      { text: 'Go for chart-toppers', personality: 'Leader', genres: ['Pop', 'Rock', 'Hip-Hop'] },
      { text: 'Deep dive into genres', personality: 'Creator', genres: ['Jazz', 'Classical', 'Blues'] },
    ],
  },
  {
    id: '2',
    question: 'When do you listen to music most?',
    options: [
      { text: 'Daytime & active', personality: 'Leader', genres: ['Pop', 'Electronic', 'Hip-Hop'] },
      { text: 'Late night vibes', personality: 'Night Owl', genres: ['Lo-fi', 'Electronic', 'R&B'] },
      { text: 'During work/study', personality: 'Thinker', genres: ['Classical', 'Ambient', 'Jazz'] },
      { text: 'Whenever I feel like it', personality: 'Explorer', genres: ['All'] },
    ],
  },
  {
    id: '3',
    question: 'What matters most in music?',
    options: [
      { text: 'Deep emotions', personality: 'Romantic', genres: ['Soul', 'R&B', 'Pop'] },
      { text: 'Lyrics & story', personality: 'Creator', genres: ['Folk', 'Hip-Hop', 'Singer-Songwriter'] },
      { text: 'Energy & beat', personality: 'Leader', genres: ['Electronic', 'Hip-Hop', 'Pop'] },
      { text: 'Musical complexity', personality: 'Thinker', genres: ['Jazz', 'Classical', 'Progressive'] },
    ],
  },
];

const PersonalityTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const songs: Song[] = songsData.songs;

  const handleAnswer = (option: (typeof PERSONALITY_QUESTIONS[0]['options'])[0]) => {
    setSelectedPersonalities([...selectedPersonalities, option.personality]);
    if (option.genres[0] !== 'All') {
      setSelectedGenres([...selectedGenres, ...option.genres]);
    }

    if (currentQuestion < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate recommendations
      const finalGenres = [
        ...selectedGenres,
        ...option.genres,
      ].filter(g => g !== 'All');
      const uniqueGenres = Array.from(new Set(finalGenres));
      const recs = recommendByGenreAndMood(songs, uniqueGenres, ['Happy', 'Energetic', 'Calm'], 8);
      setRecommendations(recs);
      setShowResults(true);
    }
  };

  const getMostCommonPersonality = (): string => {
    const counts: Record<string, number> = {};
    selectedPersonalities.forEach(p => {
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), 'Explorer');
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedPersonalities([]);
    setSelectedGenres([]);
    setShowResults(false);
    setRecommendations([]);
  };

  if (!PERSONALITY_QUESTIONS[currentQuestion]) return null;

  const question = PERSONALITY_QUESTIONS[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / PERSONALITY_QUESTIONS.length) * 100;

  return (
    <section id="personality" className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-3 gradient-text">
          <User className="w-8 h-8" />
          Music Personality Test
        </h2>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {PERSONALITY_QUESTIONS.length}</span>
                  <span className="text-sm text-gray-400">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold mb-8 text-center"
              >
                {question.question}
              </motion.h3>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option)}
                    className="glass-morphism p-6 rounded-xl text-left hover:border-secondary/60 border border-gray-700 transition-all hover:scale-105"
                  >
                    <p className="text-lg font-semibold">{option.text}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Your Music Personality</h3>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block gradient-bg text-white rounded-full px-8 py-4 text-2xl font-bold mb-4"
                >
                  {getMostCommonPersonality()}
                </motion.div>
                <p className="text-gray-400">Based on your answers, here are your recommended artists and songs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {recommendations.map((song, index) => (
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

              <div className="flex justify-center">
                <button onClick={resetTest} className="btn-primary flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Retake Test
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonalityTest;
