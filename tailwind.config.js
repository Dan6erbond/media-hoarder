const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", // configure the Flowbite JS source template paths
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ["Kanit", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // require Flowbite's plugin for Tailwind CSS
  ],
};
