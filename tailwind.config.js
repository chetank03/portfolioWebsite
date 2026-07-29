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
        darkGreen: "#496747",
        lightBackground: "#EDE6D8",
        darkBackground: "#E2D9C6",
        darkBlack: "#2B2A25",
        grayColor: "#645E4F",
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
