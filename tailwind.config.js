/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins-Regular", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2F80ED",
          glow: "#4D96FF",
        },
        secondary: {
          DEFAULT: "#0B0E14",
          card: "#161B26",
          surface: "#1F2633",
        },
        text: {
          main: "#FFFFFF",
          muted: "#828282",
        },
        accent: {
          income: "#219653",
          expense: "#EB5757",
        },
      },
    },
  },
  plugins: [],
};
