'use client';

import React, { useEffect } from 'react';
import { useMusicStore } from '@/store/musicStore';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode, loadStats, loadFavorites } = useMusicStore();

  useEffect(() => {
    loadStats();
    loadFavorites();
  }, [loadStats, loadFavorites]);

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <head>
        <title>MelodyVerse - Your Music Discovery Platform</title>
        <meta name="description" content="Discover your music personality and get personalized recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} transition-colors duration-300`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
