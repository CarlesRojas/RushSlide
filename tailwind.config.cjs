/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        landscape: ["game header", "game footer"],
        portrait: ["header", "game", "footer"],
      },
      gridTemplateColumns: {
        landscape: "minmax(0, 1fr) minmax(25%, 25rem)",
        portrait: "minmax(0, 1fr)",
      },
      gridTemplateRows: {
        landscape: "minmax(0, 1fr) minmax(0, 1fr)",
        portrait: "minmax(min-content, 20%) minmax(0, 1fr) minmax(min-content, 20%)",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
}
