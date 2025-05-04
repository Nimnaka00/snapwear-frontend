/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        russianViolet: '#231651',
        darkVoid: '#151419',
        gluconGray: '#1B1A1F',
        mintGreen: '#D6FFF6',
        dustyGray: '#878787',
        snow: '#FBFBFB',
        textMain: '#0E0920',
        bgColor: '#13151B',
        lineGray: 'rgba(102, 102, 102, 0.25)', 
        cardBg: 'rgba(251, 251, 251, 0.2)',  
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
