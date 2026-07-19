# Getting Started with MelodyVerse

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/divyanshdixit2912-max/musical-time-machine.git
cd musical-time-machine

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

## Project Structure

```
musical-time-machine/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   └── dashboard.tsx        # Full app dashboard
│   ├── components/              # React components
│   ├── data/                    # JSON databases
│   ├── hooks/                   # Custom hooks
│   ├── store/                   # Zustand store
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── README.md
├── FEATURES.md
├── CHANGELOG.md
└── DEVELOPMENT.md
```

## Key Components

### Pages
- **Hero** - Landing page with animations
- **GenreEngine** - Genre & mood selection
- **MoodQuiz** - 5-question mood detector
- **PersonalityTest** - Music personality finder
- **SongRoulette** - Random song picker
- **ThisOrThat** - Preference game
- **BirthMusicExplorer** - Year-based discovery
- **GuessSong** - Identification game
- **DailyRecommendation** - Song of the day
- **WeatherPlaylist** - Mood-based playlists
- **SongSearch** - Advanced search
- **MusicFacts** - Fun facts
- **QuoteGenerator** - Inspirational quotes
- **StatisticsDashboard** - User stats
- **PersonalityCard** - Shareable profile

## Core Hooks

```typescript
// Get recommendations
const { getByGenreAndMood, getTrending } = useRecommendations(songs);

// Manage favorites
const { favorites, addFavorite } = useFavorites();

// Use local storage
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## State Management

```typescript
import { useMusicStore } from '@/store/musicStore';

const { 
  favorites, 
  addFavorite, 
  removeFavorite, 
  userStats,
  darkMode,
  toggleDarkMode 
} = useMusicStore();
```

## Adding New Songs

Edit `src/data/songs.json`:

```json
{
  "id": "11",
  "title": "New Song",
  "artist": "Artist Name",
  "album": "Album Name",
  "genre": ["Pop"],
  "mood": ["Happy"],
  "energy": 8,
  "tempo": "fast",
  "releaseYear": 2023,
  "releaseDate": "2023-01-01",
  "popularity": 85,
  "spotifyUrl": "https://open.spotify.com/track/...",
  "imageUrl": "https://...",
  "tags": ["trending"],
  "duration": 180
}
```

## Creating New Components

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MyComponent: React.FC = () => {
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

export default MyComponent;
```

## Building for Production

```bash
# Build
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel deploy
```

## Environment Variables

No environment variables required! This is a fully client-side app.

## Performance Tips

1. Keep components small
2. Use React.memo for expensive renders
3. Lazy load components with dynamic imports
4. Optimize images
5. Use CSS-in-JS sparingly

## Testing

```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

## Deployment Options

### Vercel (Recommended)
```bash
vercel deploy
```

### GitHub Pages
```bash
npm run build
git add .
git commit -m "Deploy"
git push
```

### Docker
```bash
docker build -t melodyverse .
docker run -p 3000:3000 melodyverse
```

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Cache issues
```bash
rm -rf .next
npm run dev
```

### LocalStorage not working
- Check browser console for errors
- Ensure localStorage is enabled
- Check quota limits

## Support

- Check DEVELOPMENT.md for detailed dev guide
- Check FEATURES.md for feature list
- Check CHANGELOG.md for version history

## License

MIT - Feel free to use and modify!

## Contributing

Contributions welcome! Fork and submit PRs.

---

**Enjoy discovering your music personality! 🎵**
