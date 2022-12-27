/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        landscape: "minmax(15rem, 25%) minmax(0, 1fr)",
        portrait: "minmax(0, 1fr)",
      },
      gridTemplateRows: {
        landscape: "minmax(0, 1fr)",
        portrait: "minmax(min-content, 25%) minmax(0, 1fr)",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
}
