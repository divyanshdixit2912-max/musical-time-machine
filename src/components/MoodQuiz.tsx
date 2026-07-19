'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RotateCcw } from 'lucide-react';
import { Song } from '@/types';
import { recommendByGenreAndMood } from '@/utils/algorithms';
import songsData from '@/data/songs.json';
import SongCard from './SongCard';

interface QuizQuestion {
  id: string;
  question: string;
  options: Array<{
    text: string;
    moods: string[];
    genres: string[];
  }>;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: "How's your day going?",
    options: [
      { text: 'Fantastic!', moods: ['Happy', 'Energetic'], genres: ['Pop', 'Electronic'] },
      { text: 'Good', moods: ['Happy', 'Calm'], genres: ['Pop', 'Folk'] },
      { text: 'Okay', moods: ['Calm', 'Reflective'], genres: ['Indie', 'Acoustic'] },
      { text: 'Rough', moods: ['Sad', 'Energetic'], genres: ['Rock', 'Blues'] },
    ],
  },
  {
    id: '2',
    question: 'How much energy do you have?',
    options: [
      { text: 'Super charged', moods: ['Energetic', 'Party'], genres: ['Electronic', 'Hip-Hop'] },
      { text: 'Normal', moods: ['Happy', 'Calm'], genres: ['Pop', 'Rock'] },
      { text: 'Tired', moods: ['Calm', 'Sleep'], genres: ['Indie', 'Lo-fi'] },
      { text: 'Very tired', moods: ['Sleep', 'Calm'], genres: ['Ambient', 'Classical'] },
    ],
  },
  {
    id: '3',
    question: 'What are you doing right now?',
    options: [
      { text: 'Working', moods: ['Focus', 'Energetic'], genres: ['Electronic', 'Lo-fi'] },
      { text: 'Relaxing', moods: ['Calm', 'Happy'], genres: ['Indie', 'Pop'] },
      { text: 'Exercising', moods: ['Energetic', 'Party'], genres: ['Hip-Hop', 'Electronic'] },
      { text: 'Sleeping', moods: ['Sleep', 'Calm'], genres: ['Ambient', 'Classical'] },
    ],
  },
  {
    id: '4',
    question: 'Choose a color that resonates with you',
    options: [
      { text: '🔴 Red (Passionate)', moods: ['Energetic', 'Romantic'], genres: ['Rock', 'R&B'] },
      { text: '🔵 Blue (Calm)', moods: ['Calm', 'Sad'], genres: ['Blues', 'Jazz'] },
      { text: '💛 Yellow (Happy)', moods: ['Happy', 'Party'], genres: ['Pop', 'Electronic'] },
      { text: '💜 Purple (Creative)', moods: ['Reflective', 'Happy'], genres: ['Indie', 'Alternative'] },
    ],
  },
  {
    id: '5',
    question: 'What\'s your ideal weekend?',
    options: [
      { text: 'Party all night', moods: ['Party', 'Energetic'], genres: ['Electronic', 'Hip-Hop'] },
      { text: 'Time with friends', moods: ['Happy', 'Energetic'], genres: ['Pop', 'Rock'] },
      { text: 'At a cafe', moods: ['Calm', 'Happy'], genres: ['Indie', 'Jazz'] },
      { text: 'Alone & peaceful', moods: ['Calm', 'Reflective'], genres: ['Acoustic', 'Classical'] },
    ],
  },
];

const MoodQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const songs: Song[] = songsData.songs;

  const handleAnswer = (option: (typeof QUIZ_QUESTIONS[0]['options'])[0]) => {
    setSelectedMoods([...selectedMoods, ...option.moods]);
    setSelectedGenres([...selectedGenres, ...option.genres]);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate recommendations
      const finalMoods = [
        ...selectedMoods,
        ...option.moods,
      ];
      const finalGenres = [
        ...selectedGenres,
        ...option.genres,
      ];
      const uniqueMoods = Array.from(new Set(finalMoods));
      const uniqueGenres = Array.from(new Set(finalGenres));
      const recs = recommendByGenreAndMood(songs, uniqueGenres, uniqueMoods, 8);
      setRecommendations(recs);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedMoods([]);
    setSelectedGenres([]);
    setShowResults(false);
    setRecommendations([]);
  };

  if (!QUIZ_QUESTIONS[currentQuestion]) return null;

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="mood" className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-3 gradient-text">
          <Brain className="w-8 h-8" />
          Mood Detection Quiz
        </h2>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
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
                    className="glass-morphism p-6 rounded-xl text-left hover:border-primary/60 border border-gray-700 transition-all hover:scale-105"
                  >
                    <p className="text-lg font-semibold">{option.text}</p>
                  </motion.button>
                ))}
              </div>

              {/* Progress Info */}
              <p className="text-center text-gray-400 text-sm">
                Answer all questions to get personalized recommendations
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Your Recommendations</h3>
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
                <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MoodQuiz;
