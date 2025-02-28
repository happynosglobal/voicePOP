/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#FFCF02",
          light: "#FFE580",
          dark: "#CC9D00",
        },
      },
      screens: {
        "3xl": "1680px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3B82F6",
          "primary-content": "#FFFFFF",
          secondary: "#EC4899",
          accent: "#334155",
          neutral: "#64748B",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
