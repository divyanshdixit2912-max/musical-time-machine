# MelodyVerse 🎵

A modern, interactive, and visually stunning music recommendation website built with React, Next.js, and Tailwind CSS.

## Features

### 🎯 Core Features
- **Beautiful Landing Page** - Hero section with animated music visualizer
- **Genre Recommendation Engine** - Discover songs by genre and mood
- **Birth Music Explorer** - Find what was trending when you were born
- **Mood Detection Quiz** - Fun interactive quiz to find your current mood
- **Personality Music Test** - MBTI-inspired music personality test
- **Song Roulette** - Get surprised with random song recommendations
- **This or That Game** - Interactive preference game to estimate music taste
- **Guess The Song** - Mini game with blurred album covers and lyrics

### 🎮 Interactive Elements
- **Music Timeline** - Explore music from 1960 to present
- **Daily Recommendation** - Fresh recommendations every day
- **Weather Playlist** - Songs based on weather conditions
- **Festival Playlists** - Special curated playlists for holidays
- **Music Wheel** - Animated spinning wheel for random picks
- **Search & Filter** - Advanced search by artist, genre, mood, year
- **Favorites System** - Save and manage your favorite songs
- **Statistics Dashboard** - View your music consumption patterns

### ✨ Polish & Animation
- Dark mode support
- Smooth animations with Framer Motion
- Glassmorphism design
- Responsive design (mobile, tablet, desktop)
- Floating album covers
- Music pulse animations
- Easter eggs and hidden interactions

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Storage**: LocalStorage
- **No Backend Required** - Client-side only

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Hero.tsx
│   ├── GenreEngine.tsx
│   ├── BirthExplorer.tsx
│   ├── MoodQuiz.tsx
│   ├── PersonalityTest.tsx
│   ├── SongRoulette.tsx
│   ├── ThisOrThat.tsx
│   ├── GuessSong.tsx
│   ├── MusicTimeline.tsx
│   ├── WeatherPlaylist.tsx
│   └── ...
├── data/                  # JSON datasets
│   ├── songs.json        # 1000+ songs database
│   ├── artists.json      # Artist information
│   ├── genres.json       # Genre definitions
│   ├── moods.json        # Mood categories
│   ├── facts.json        # Music facts
│   └── quotes.json       # Music quotes
├── hooks/                # Custom React hooks
│   ├── useRecommendations.ts
│   ├── useFavorites.ts
│   └── useQuizLogic.ts
├── utils/                # Utility functions
│   ├── algorithms.ts     # Recommendation algorithms
│   ├── storage.ts        # LocalStorage helpers
│   └── helpers.ts        # General utilities
├── types/                # TypeScript type definitions
│   └── index.ts
└── store/                # Zustand state management
    └── musicStore.ts
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/divyanshdixit2912-max/musical-time-machine.git
cd musical-time-machine

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Key Features Explained

### Recommendation Algorithm
- Genre similarity matching
- Mood-based filtering
- Energy level compatibility
- Popularity scoring
- User preference learning
- Randomness factor for discovery

### Song Dataset
1000+ songs with metadata:
- Title, Artist, Album
- Genre & Mood tags
- Energy & Tempo levels
- Release year & date
- Popularity score
- Spotify URLs
- Album cover images

### Local Storage
All user data stored locally:
- Favorites list
- Recently viewed songs
- Quiz responses
- User preferences
- Statistics

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Fully client-side (no backend needed)
- Optimized image loading
- Lazy component loading
- Smooth 60fps animations
- Sub-second response times

## Future Enhancements

- [ ] Social sharing features
- [ ] User accounts (optional backend)
- [ ] Spotify integration for real listening data
- [ ] AI-powered recommendations
- [ ] Music collaboration features
- [ ] Real-time trending data
- [ ] Mobile app version

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Built with ❤️ by the MelodyVerse team

---

**Start exploring your music taste today! 🎶**
