'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import GenreEngine from '@/components/GenreEngine';
import Navigation from '@/components/Navigation';
import BirthMusicExplorer from '@/components/BirthMusicExplorer';
import MoodQuiz from '@/components/MoodQuiz';
import PersonalityTest from '@/components/PersonalityTest';
import SongRoulette from '@/components/SongRoulette';
import ThisOrThat from '@/components/ThisOrThat';
import GuessSong from '@/components/GuessSong';
import DailyRecommendation from '@/components/DailyRecommendation';
import WeatherPlaylist from '@/components/WeatherPlaylist';
import SongSearch from '@/components/SongSearch';
import MusicFacts from '@/components/MusicFacts';
import QuoteGenerator from '@/components/QuoteGenerator';
import StatisticsDashboard from '@/components/StatisticsDashboard';
import PersonalityCard from '@/components/PersonalityCard';
import { useMusicStore } from '@/store/musicStore';

export default function Home() {
  const { updateLastVisited } = useMusicStore();

  useEffect(() => {
    updateLastVisited();
  }, [updateLastVisited]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-dark">
      <Navigation />
      <Hero />
      <GenreEngine />
      <BirthMusicExplorer />
      <MoodQuiz />
      <PersonalityTest />
      <SongSearch />
      <SongRoulette />
      <ThisOrThat />
      <GuessSong />
      <DailyRecommendation />
      <WeatherPlaylist />
      <MusicFacts />
      <QuoteGenerator />
      <StatisticsDashboard />
      <PersonalityCard />
    </main>
  );
}
