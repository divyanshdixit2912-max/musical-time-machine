'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Volume2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import GenreEngine from '@/components/GenreEngine';
import MoodQuiz from '@/components/MoodQuiz';
import PersonalityTest from '@/components/PersonalityTest';
import SongRoulette from '@/components/SongRoulette';
import ThisOrThat from '@/components/ThisOrThat';
import BirthMusicExplorer from '@/components/BirthMusicExplorer';
import GuessSong from '@/components/GuessSong';
import DailyRecommendation from '@/components/DailyRecommendation';
import WeatherPlaylist from '@/components/WeatherPlaylist';
import SongSearch from '@/components/SongSearch';
import MusicFacts from '@/components/MusicFacts';
import QuoteGenerator from '@/components/QuoteGenerator';
import StatisticsDashboard from '@/components/StatisticsDashboard';
import PersonalityCard from '@/components/PersonalityCard';

const FullPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const sections = [
    { id: 'home', name: 'Home', component: <div><Navigation /><Hero /><GenreEngine /></div> },
    { id: 'quiz', name: 'Mood Quiz', component: <MoodQuiz /> },
    { id: 'personality', name: 'Personality', component: <PersonalityTest /> },
    { id: 'birth', name: 'Birth Music', component: <BirthMusicExplorer /> },
    { id: 'roulette', name: 'Roulette', component: <SongRoulette /> },
    { id: 'thisorthat', name: 'This or That', component: <ThisOrThat /> },
    { id: 'guess', name: 'Guess Song', component: <GuessSong /> },
    { id: 'daily', name: 'Daily Rec', component: <DailyRecommendation /> },
    { id: 'weather', name: 'Weather', component: <WeatherPlaylist /> },
    { id: 'search', name: 'Search', component: <SongSearch /> },
    { id: 'facts', name: 'Facts', component: <MusicFacts /> },
    { id: 'quotes', name: 'Quotes', component: <QuoteGenerator /> },
    { id: 'stats', name: 'Stats', component: <StatisticsDashboard /> },
    { id: 'card', name: 'My Card', component: <PersonalityCard /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-dark">
      {activeSection === 'home' ? (
        sections[0].component
      ) : (
        <>
          <Navigation />
          {sections.find(s => s.id === activeSection)?.component}
        </>
      )}

      {/* Bottom Navigation */}
      {activeSection !== 'home' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-dark-secondary/95 backdrop-blur-sm border-t border-gray-700 overflow-x-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveSection('home')}
              className="px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all hover:bg-primary hover:text-white"
            >
              Home
            </button>
            {sections.slice(1).map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all ${
                  activeSection === section.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default FullPage;
