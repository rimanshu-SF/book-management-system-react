/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "yellow": "#FFB200",
        "blue-gray":"#EAF2F8",
        "navy-blue": "#1F4E79",
        "coral-pink": "#FF6F61",
        "turquoise":"#56CCF2",
        "lime-green": "#3ba366",
        "dark-green": "#1a733f",
        "light-gray": "#D1D9E6",
        "light-org": "#FF5722",

      },
      fontFamily:{
        "pop": ["Poppins"],
        "canvet": ["Caveat"]
      }
    },
  },
  plugins: [],
}

