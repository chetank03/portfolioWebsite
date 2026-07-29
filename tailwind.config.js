/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#7C9473",
        darkGreen: "#5B7A5A",
        lightBackground: "#FAF6EE",
        darkBackground: "#F1EBDD",
        darkBlack: "#2B2A25",
        grayColor: "#6C6555",
        yellowColor: "#C9A15A",
      },
      fontFamily: {
        serif: ["'Noto Serif JP'", "serif"],
        sans: ["'Noto Sans JP'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
