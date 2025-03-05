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
        min: "1400px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3B82F6",
          "primary-content": "#FFFFFF",
          error: "#f87171",
          "error-content": "#FFFFFF",
          secondary: "#EC4899",
          accent: "#334155",
          "accent-content": "#FFFFFF",
          neutral: "#9ca3af",
          "neutral-content": "#FFFFFF",
          "base-100": "#F3F4F6",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    function ({ addComponents }) {
      addComponents({
        ".btn-sm": {
          height: "38px",
          "border-radius": "5px",
        },
      });
    },
  ],
};
