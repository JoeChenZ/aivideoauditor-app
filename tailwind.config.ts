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
        rule:     '#252533',
        accent:   '#3b82f6',
        'accent-glow': 'rgba(59,130,246,0.15)',
        neon: {
          purple: '#a78bfa',
          blue:   '#60a5fa',
          green:  '#34d399',
          amber:  '#fbbf24',
          red:    '#f87171',
          cyan:   '#22d3ee',
        },
        ink: {
          primary:   '#f1f5f9',
          secondary: '#94a3b8',
          muted:     '#475569',
        },
      },
      fontFamily: {
        sans:    ['var(--font-geist)', 'Geist', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'Geist Mono', 'monospace'],
      },
      letterSpacing: {
        kicker: '0.22em',
      },
      maxWidth: {
        prose: '68ch',
        reading: '72ch',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
