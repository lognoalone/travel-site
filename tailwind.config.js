/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E40AF',
          green: '#059669',
        },
        secondary: {
          blue: '#60A5FA',
          green: '#34D399',
        }
      }
    },
  },
  plugins: [],
}

