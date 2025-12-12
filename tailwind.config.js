/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          dark: {
            50: '#3d4a5c',
            100: '#364252',
            200: '#2f3a48',
            300: '#2d3748',
            400: '#262f3d',
            500: '#1e2936',
            600: '#1a232e',
            700: '#151c26',
            800: '#10161e',
            900: '#0a0f16',
          },
          teal: {
            50: '#e6f7f5',
            100: '#b3e8e0',
            200: '#80d9cb',
            300: '#4dcab6',
            400: '#1abba1',
            500: '#0d9488',
            600: '#0a766d',
            700: '#085952',
            800: '#053b37',
            900: '#031e1c',
          },
          navy: {
            50: '#e8eef9',
            100: '#bccfed',
            200: '#90b0e1',
            300: '#6491d5',
            400: '#3872c9',
            500: '#1e3a8a',
            600: '#182e6e',
            700: '#122352',
            800: '#0c1736',
            900: '#060c1a',
          },
        },
      },
      boxShadow: {
        'medical': '0 4px 20px rgba(13, 148, 136, 0.15)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
