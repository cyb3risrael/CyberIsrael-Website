/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Share Tech Mono"', 'monospace'],
        body: ['"Exo 2"', 'sans-serif'],
        hebrew: ['"Rubik"', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: '#050A0F',
          dark: '#0A1628',
          card: '#0D1F35',
          border: '#1A3A5C',
          green: '#00FF88',
          teal: '#00D4FF',
          blue: '#0066FF',
          purple: '#8B5CF6',
          pink: '#FF0080',
          yellow: '#FFD700',
        },
        light: {
          bg: '#F0F4FF',
          card: '#FFFFFF',
          border: '#CBD5E8',
          text: '#1A2540',
          muted: '#64748B',
          blue: '#2563EB',
          teal: '#0891B2',
          accent: '#003399',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 4s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.6' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse at center, #0A1628 0%, #050A0F 70%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2)',
        'neon-teal': '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2)',
        'neon-blue': '0 0 20px rgba(0,102,255,0.4), 0 0 40px rgba(0,102,255,0.2)',
        'neon-purple': '0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
        'glass-light': '0 8px 32px rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
