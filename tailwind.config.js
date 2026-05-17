/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#04070d',
        'abyss': '#0c1222',
        'surface': '#111d32',
        'teal': {
          DEFAULT: '#00d4aa',
          dim: '#00d4aa33',
          glow: '#00d4aa66',
        },
        'ember': {
          DEFAULT: '#ff6b35',
          dim: '#ff6b3533',
          glow: '#ff6b3566',
        },
        'iris': {
          DEFAULT: '#7c5cfc',
          dim: '#7c5cfc33',
          glow: '#7c5cfc66',
        },
        'steel': '#1a2332',
        'smoke': '#64748b',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-teal': 'radial-gradient(circle at 30% 40%, rgba(0,212,170,0.08) 0%, transparent 60%)',
        'radial-ember': 'radial-gradient(circle at 70% 60%, rgba(255,107,53,0.06) 0%, transparent 60%)',
        'radial-iris': 'radial-gradient(circle at 50% 50%, rgba(124,92,252,0.06) 0%, transparent 60%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-mid': 'float 5s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 3s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'dash': 'dash 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseNeon: {
          '0%': { boxShadow: '0 0 5px rgba(0,212,170,0.3), 0 0 20px rgba(0,212,170,0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0,212,170,0.5), 0 0 40px rgba(0,212,170,0.2)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dash: {
          '0%': { strokeDashoffset: '300' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
