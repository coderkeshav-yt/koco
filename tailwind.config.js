/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F0F0F",
          gray: "#1A1A1A",
          light: "#EDEDED",
          accent: "#FC6E20",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
