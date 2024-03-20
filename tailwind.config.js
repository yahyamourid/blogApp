/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      animation: {
        'tilt': 'tilt 7s infinite linear',
        'spin-zoom': 'spin-zoom 20s infinite linear',
        'spin0': 'spin0 20s infinite linear',
        'features': 'features 10s infinite linear',
      },
      keyframes: {
        'tilt': {
          '0%, 50%, 100%': {
            transform: 'rotate(5deg)',
          },
          '25%': {
            transform: 'rotate(2.5deg)',
          },
          '75%': {
            transform: 'rotate(-5deg)',
          },
        },
        'spin-zoom': {
          '0%': {
            transform: 'rotate(0deg) scale(0.8)',
          },
          '25%': {
            transform: 'rotate(90deg) scale(0.9)',
          },
          '50%': {
            transform: 'rotate(180deg) scale(1)',
          },
          '75%': {
            transform: 'rotate(270deg) scale(0.9)',
          },
          '100%': {
            transform: 'rotate(360deg) scale(0.8)',
          },
        },
        'spin0': {
          '0%': {
            transform: 'scale(0.9)',
          },
          '25%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '75%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0.9)',
          },
        },
        'features': {
          '0%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            transform: 'rotate(5deg) scale(1.1)',
          },
          '50%': {
            transform: 'rotate(10deg) scale(1.2)',
          },
          '75%': {
            transform: 'rotate(5deg) scale(1.1)',
          },
          '100%': {
            transform: 'rotate(0deg) scale(1)',
          },
        },
      },
    },
    fontFamily: {
      body: ["Poppins"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
