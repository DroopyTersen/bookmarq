/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        "droopy-theme": {
          primary: "#ff6188",
          "primary-focus": "#cd5170",
          "primary-content": "#ffffff",
          secondary: "#ffd866",
          "secondary-focus": "#bda14c",
          "secondary-content": "#2c2a2e",
          accent: "#78dce8",
          "accent-focus": "#218997",
          "accent-content": "#ffffff",
          neutral: "#2c2a2e",
          "neutral-focus": "#383739",
          "neutral-content": "#ffffff",
          "base-100": "#364d5b",
          "base-200": "#253945",
          "base-300": "#0a1a23",
          "base-content": "#f1f5f9",
          info: "#a3d0ff",
          success: "#88eca1",
          warning: "#ff9900",
          error: "#a33535",
        },
      },
    ],
  },
}
