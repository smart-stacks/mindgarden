/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-mindgarden': 'linear-gradient(135deg, #FAEDCD, #DDBDD5)',
        'gradient-nav': 'linear-gradient(to bottom, #DDBDD5, #C9AFCB)',
      },
      colors: {
        primary: '#F6BD60',
        'background-soft': '#F9D390',
        secondary: '#DDBDD5',
        'secondary-darker': '#C9AFCB',
        background: '#FAEDCD',
        warning: '#F4A259',
        emergency: '#E76F51',
        success: '#CBAACB',
        'primary-dark': '#E5A94A',
        'secondary-dark': '#C8A8C8',
        'background-dark': '#F0E0B8',
        'warning-dark': '#E0944A',
        'emergency-dark': '#D65A3A',
        'success-dark': '#B89AB8',
      },
      boxShadow: {
        'nav': '0 2px 8px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', y: '20px' },
          '100%': { opacity: '1', y: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
} 