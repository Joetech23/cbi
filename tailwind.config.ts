import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#0c1a4a',
          900: '#162d6e',
          800: '#1e3a8a',
          700: '#1d4ed8',
          100: '#dbeafe',
          50:  '#eff6ff',
        },
        royal: '#1e3a8a',
        gold: {
          DEFAULT: '#eab308',
          600: '#ca8a04',
          400: '#facc15',
          100: '#fef9c3',
        },
        ink: '#0f172a',
        muted: '#64748b',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-space)', 'monospace'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        '7xl':  ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '6xl':  ['3.75rem',{ lineHeight: '1.08', letterSpacing: '-0.02em' }],
        '5xl':  ['3rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '4xl':  ['2.25rem',{ lineHeight: '1.15', letterSpacing: '-0.015em' }],
        '3xl':  ['1.875rem',{ lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'soft':   '0 2px 20px rgba(30,58,138,0.06)',
        'medium': '0 8px 32px rgba(30,58,138,0.12)',
        'large':  '0 20px 60px rgba(30,58,138,0.18)',
        'gold':   '0 8px 32px rgba(234,179,8,0.25)',
        'blue':   '0 8px 32px rgba(30,58,138,0.30)',
      },
      backgroundImage: {
        'gradient-royal': 'linear-gradient(135deg, #0c1a4a 0%, #1e3a8a 60%, #1d4ed8 100%)',
        'gradient-gold':  'linear-gradient(135deg, #eab308 0%, #facc15 100%)',
        'gradient-dark':  'linear-gradient(to bottom, rgba(12,26,74,0.95) 0%, rgba(30,58,138,0.85) 100%)',
      },
      animation: {
        'fade-up':        'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':        'fadeIn 0.6s ease-out forwards',
        'slide-left':     'slideLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee':        'marquee 30s linear infinite',
        'marquee-slow':   'marquee 50s linear infinite',
        'float':          'float 6s ease-in-out infinite',
        'pulse-gold':     'pulseGold 2s ease-in-out infinite',
        'draw-line':      'drawLine 1s ease-out forwards',
        'count-up':       'fadeIn 0.5s ease-out forwards',
        'shimmer':        'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(234,179,8,0.4)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(234,179,8,0)' },
        },
        drawLine: {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth':  'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
