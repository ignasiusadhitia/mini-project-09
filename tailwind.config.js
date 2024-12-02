/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roobert: ['Roobert', ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      heavy: 800,
      bold: 700,
      semibold: 600,
      medium: 500,
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
      margin: {},
      padding: {},
      borderRadius: {},
      fontSize: {},
      height: {},
      width: {},
    },
  },
  plugins: [],
};
