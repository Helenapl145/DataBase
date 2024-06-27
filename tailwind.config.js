/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bgWhite": "#F1F1F1",
        "btnLogin": "#FF9900",
        "info": "#A3A3A3",
        "line": "#E9E9E9",
        "subtitle": "#B4B4B4",
        "lineProducts": "#E2E2E2",
        "categoryBad": "#EB4C4C",
        "categoryGood": "#4FEB4C",
        "borderGray": "#AEAEAE",
        "numberPhone": "#7D90F3",
        "active": "#FF8B3E",
        "categoryGold": "#FFD700",
        "categorySilver": "#C0C0C0",
        "categoryBronze": "#CD7F32",
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      },
      boxShadow: {
        '3xl': '10px 10px 0px -5px #FF990099',
      }
    },
  },
  plugins: [],
}