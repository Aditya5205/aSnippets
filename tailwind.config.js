/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4608ad",
        blue: {
          600: "#ffffff",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
