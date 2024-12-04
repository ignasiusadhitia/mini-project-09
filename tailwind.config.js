/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roobert: ['Open Sans', 'sans-serif'],
    },
    fontSize: {
      16: '1rem',
      17: '1.0625rem',
      24: '1.5rem',
      28: '1.75rem',
      44: '2.75rem',
      60: '3.75rem',
      100: '6.25rem',
      350: '21.875rem',
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
      center: 'true',
      screens: {},
    },
    extend: {
      colors: {
        black: '#101010',
        'pure-black': '#000000',
        white: '#FFFFFF',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'primary-lighter': '#febc0a',
        'primary-darker': '#fec00a',
        'blue-link': '#4589f7',
        grey: '#d9d9d9',
        'grey-transparent': 'rgba(217, 217, 217, 0.5)',
        gray: '#9a9b9b',
        'green-avatar': '#c8e1c0',
        'purple-avatar': '#ccc6ed',
        'yellow-avatar': '#fef1e0',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      spacing: {
        27.5: '6.938rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
