/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roobert: ['Open Sans', 'sans-serif'],
    },
    fontSize: {
      350: '21.875rem',
      100: '6.25rem',
      60: '3.75rem',
      44: '2.75rem',
      28: '1.75rem',
      24: '1.5rem',
      17: '1.0625rem',
      16: '1rem',
    },
    letterSpacing: {
      0: '0',
      '-2': '-0.02em',
    },
    lineHeight: {
      110: '1.1',
      212: '2.12',
    },
    container: {
      center: true,
      screens: {
        // sm: '100%',
        // md: '100%',
        // lg: '1216px',
        // xl: '1216px',
        // '2xl': '1216px',
      },
    },
    extend: {
      colors: {
        black: '#101010',
        'pure-black': '#000000',
        white: '#FFFFFF',
        primary: '#fdca09',
        'primary-lighter': '#febc0a',
        'primary-darker': '#fec00a',
        'blue-link': '#4589f7',
        grey: '#d9d9d9',
        'grey-transparent': 'rgba(217, 217, 217, 0.5)',
        gray: '#9a9b9b',
        'green-avatar': '#c8e1c0',
        'purple-avatar': '#ccc6ed',
        'yellow-avatar': '#fef1e0',
      },
      spacing: {
        27.5: '6.938rem',
      },
    },
  },
  plugins: [],
};
