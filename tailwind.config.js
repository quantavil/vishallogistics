// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eef7ff',
            100: '#d9eeff',
            200: '#bbdeff',
            300: '#8cc8ff',
            400: '#54a8ff',
            500: '#2c89ff',
            600: '#146aff',
            700: '#0e55ef',
            800: '#1344bf',
            900: '#163c95',
          },
          secondary: {
            50: '#f5f7fa',
            100: '#ebeef3',
            200: '#d2dae5',
            300: '#adbdcf',
            400: '#839ab4',
            500: '#627d9b',
            600: '#4d6481',
            700: '#405168',
            800: '#394658',
            900: '#283141',
          },
          accent: {
            50: '#fcf5ff',
            100: '#f8ebff',
            200: '#f2d6ff',
            300: '#e9b3ff',
            400: '#dc85ff',
            500: '#c94dff',
            600: '#b01fff',
            700: '#9613dd',
            800: '#7d12b9',
            900: '#611492',
          },
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          display: ['Montserrat', 'sans-serif'],
        },
        boxShadow: {
          'glow': '0 0 15px rgba(44, 137, 255, 0.5)',
          'soft': '0 10px 25px -3px rgba(0, 0, 0, 0.05)',
          'card': '0 15px 35px rgba(0, 0, 0, 0.1)',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'hero-pattern': "url('/images/pattern-bg.svg')",
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      },
    },
    plugins: [],
  };