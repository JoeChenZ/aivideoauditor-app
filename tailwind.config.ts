import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void:     '#050507',
        surface:  '#0d0d12',
        elevated: '#141419',
        border:   '#1e1e28',
        neon: {
          purple: '#a78bfa',
          blue:   '#60a5fa',
          green:  '#34d399',
          amber:  '#fbbf24',
          red:    '#f87171',
        },
        ink: {
          primary:   '#f1f5f9',
          secondary: '#94a3b8',
          muted:     '#475569',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
};

export default config;
