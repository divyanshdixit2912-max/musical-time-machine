# Development Guide

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.tsx          # Nav bar
│   ├── Hero.tsx                # Landing hero
│   ├── GenreEngine.tsx         # Genre selector
│   ├── SongCard.tsx            # Song display card
│   ├── SongSearch.tsx          # Search functionality
│   ├── MoodQuiz.tsx            # Mood detection quiz
│   ├── PersonalityTest.tsx     # MBTI-style test
│   ├── SongRoulette.tsx        # Random song picker
│   ├── ThisOrThat.tsx          # Preference game
│   ├── DailyRecommendation.tsx # Daily pick
│   ├── WeatherPlaylist.tsx     # Weather-based picks
│   ├── MusicFacts.tsx          # Fun facts
│   ├── QuoteGenerator.tsx      # Inspirational quotes
│   ├── PersonalityCard.tsx     # Shareable card
│   ├── Favorites.tsx           # Favorites list
│   └── StatisticsDashboard.tsx # User stats
├── data/
│   ├── songs.json              # Song database
│   ├── genres.json             # Genre definitions
│   ├── moods.json              # Mood definitions
│   ├── facts.json              # Music facts
│   └── quotes.json             # Inspirational quotes
├── hooks/
│   ├── useRecommendations.ts   # Recommendation logic
│   ├── useFavorites.ts         # Favorites management
│   └── useLocalStorage.ts      # Local storage hook
├── store/
│   └── musicStore.ts           # Zustand state store
├── types/
│   └── index.ts                # TypeScript definitions
└── utils/
    ├── algorithms.ts           # Recommendation algorithms
    ├── helpers.ts              # Utility functions
    └── storage.ts              # LocalStorage utilities
```

## Adding New Features

### 1. Adding New Songs

Edit `src/data/songs.json` and add song objects:

```json
{
  "id": "11",
  "title": "Song Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "genre": ["Pop", "Electronic"],
  "mood": ["Happy", "Energetic"],
  "energy": 8,
  "tempo": "fast",
  "releaseYear": 2023,
  "releaseDate": "2023-01-15",
  "popularity": 85,
  "spotifyUrl": "https://open.spotify.com/track/...",
  "imageUrl": "https://...",
  "tags": ["trending", "2020s"],
  "duration": 200
}
```

### 2. Creating New Components

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NewComponent: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Your content */}
      </motion.div>
    </section>
  );
};

export default NewComponent;
```

### 3. Using Recommendations Hook

```typescript
import { useRecommendations } from '@/hooks/useRecommendations';
import songsData from '@/data/songs.json';

const YourComponent = () => {
  const { getByGenreAndMood, getTrending } = useRecommendations(songsData.songs);
  
  const recommendations = getByGenreAndMood(['Pop'], ['Happy'], 10);
  const trending = getTrending(5);
};
```

### 4. Adding to State Store

```typescript
import { useMusicStore } from '@/store/musicStore';

const MyComponent = () => {
  const { favorites, addFavorite } = useMusicStore();
  // Use store methods
};
```

## Styling

- Use Tailwind CSS utility classes
- Use Framer Motion for animations
- Responsive: mobile-first approach
- Dark mode by default

## Running the Project

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Tips

1. All data is stored locally - no backend required
2. Use LocalStorage for user preferences
3. Keep components small and reusable
4. Add animations for smooth UX
5. Test on mobile devices
6. Use semantic HTML
7. Keep accessibility in mind

## Future Enhancements

- [ ] Add more songs (aim for 1000+)
- [ ] Music timeline feature
- [ ] Birth music explorer
- [ ] Guess the song game
- [ ] Compare music taste between users
- [ ] Festival playlists
- [ ] Achievement system
- [ ] PWA support
- [ ] Spotify integration
