/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-blue": "#252A34",
        "asthetic":"#A0AEC0",
        "blue-gray":"#EAF2F8",
        "navy-blue": "#1F4E79",
        "coral-pink": "#FF6F61",
        "turquoise":"#56CCF2",
        "soft-gary": "#A0AEC0",
        "dark-green": "#00FF7F",
        "muted-red": "#FF6B6B",
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

