import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4ff',
          100: '#dce8ff',
          200: '#b8d0ff',
          300: '#82aaff',
          400: '#4d7fff',
          500: '#2563eb',
          800: '#0f2347',
          900: '#0A1628',
          950: '#060d1a',
        },
        finc: {
          green:  '#10B981',
          red:    '#EF4444',
          yellow: '#F59E0B',
        },
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}

export default config
