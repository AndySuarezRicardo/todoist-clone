/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc4c3e',
        secondary: '#058527',
        accent: '#4285F4',
      },
    },
  },
  plugins: [],
}
