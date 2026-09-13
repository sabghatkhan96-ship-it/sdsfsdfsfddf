/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#020b16',
        foreground: '#f8fafc',
        card: {
          DEFAULT: 'rgba(10, 20, 38, 0.75)',
          foreground: '#f8fafc',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          foreground: '#94a3b8',
        },
        primary: {
          DEFAULT: '#f8fafc',
          foreground: '#020b16',
        },
        accent: {
          DEFAULT: '#142238',
          foreground: '#f8fafc',
        },
        fame: {
          bg: '#020b16',
          card: '#081324',
          border: 'rgba(255, 255, 255, 0.09)',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'landing-shine': 'landingShine 2.8s ease-in-out infinite',
        'landing-float': 'landingFloat 6s ease-in-out infinite',
        'landing-float-delayed': 'landingFloat 6s ease-in-out 2s infinite',
        'landing-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        landingShine: {
          '0%': { left: '-40%' },
          '50%, 100%': { left: '140%' },
        },
        landingFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
