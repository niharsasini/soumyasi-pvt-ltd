/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: '#0f1117',
          sidebar: '#1a1d27',
          card: '#1e2235',
          border: '#2a2d3e',
          hover: '#252840',
        }
      }
    }
  },
  plugins: [],
}
