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
        lightGreen: "#2DD4BF",
        darkGreen: "#5EEAD4",
        lightBackground: "#071014",
        darkBackground: "#0B1720",
        darkBlack: "#E6F1F5",
        grayColor: "#94A3B8",
        yellowColor: "FFE033",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
