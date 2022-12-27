/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mouse: { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
}
