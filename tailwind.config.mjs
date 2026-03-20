// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0C1E35',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1B3A57',
          900: '#0C1E35',
          950: '#061322',
        },
        copper: {
          DEFAULT: '#D4622B',
          50: '#FDF3ED',
          100: '#FAE0CF',
          200: '#F5C1A0',
          300: '#EFA070',
          400: '#E8813F',
          500: '#D4622B',
          600: '#B04E21',
          700: '#8B3D1A',
          800: '#672D13',
          900: '#421D0C',
        },
        cream: '#F7F5F2',
        offblack: '#1C1C1C',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};