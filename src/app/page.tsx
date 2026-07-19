'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import GenreEngine from '@/components/GenreEngine';
import Navigation from '@/components/Navigation';
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
      {/* More sections will be added */}
    </main>
  );
}
