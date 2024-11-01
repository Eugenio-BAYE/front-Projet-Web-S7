/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    colors: {
      temporary: {
        white : '#FFFFFF',
      }

    },
  },
  extend: {
    
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "mocha",
    }),],
};
