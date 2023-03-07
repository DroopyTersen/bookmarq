/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        "droopy-theme": {
          primary: "#e2574c",
          "primary-focus": "#cb4e44",
          "primary-content": "#ffffff",
          secondary: "#f0c65f",
          "secondary-focus": "#d7b354",
          "secondary-content": "#253945",
          accent: "#218997",
          "accent-focus": "#197c8a",
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
