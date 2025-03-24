/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          ultra: {
            red: '#e11d48',
            dark: '#0f0f0f',
            gray: '#1f1f1f',
          },
        },
        fontFamily: {
          ultra: ['"Bebas Neue"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  