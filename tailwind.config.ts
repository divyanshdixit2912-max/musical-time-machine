import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d28d9',
          light: '#7c3aed',
        },
        secondary: {
          DEFAULT: '#ec4899',
        },
        accent: {
          DEFAULT: '#f59e0b',
        },
        dark: {
          DEFAULT: '#0f172a',
          secondary: '#1e293b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
