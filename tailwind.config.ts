/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
        mono: ["var(--font-space-mono)", ...fontFamily.mono],
      },
      colors: {
        primary: {
          DEFAULT: "#0572e6",
          50: "#e1efff",
          100: "#b3d6ff",
          200: "#80bbff",
          300: "#4da0ff",
          400: "#1a85ff",
          500: "#0572e6",
          600: "#0459b3",
          700: "#033080",
          800: "#02264d",
          900: "#010d1a",
        },
        secondary: {
          DEFAULT: "#0d1219",
          50: "#e3e4e7",
          100: "#b3b6bb",
          200: "#83878f",
          300: "#545863",
          400: "#242937",
          500: "#0d1219",
          600: "#0b1016",
          700: "#090d12",
          800: "#06090d",
          900: "#030508",
        },
        light: "#ffffff",
        dark: "#0d1219", // Aplica tu color de fondo
        neutral: {
          100: "#f7f7f7",
          200: "#e1e1e1",
          300: "#cfcfcf",
          400: "#b1b1b1",
          500: "#9e9e9e",
          600: "#7e7e7e",
          700: "#626262",
          800: "#515151",
          900: "#3b3b3b",
        },
      },
      boxShadow: {
        "soft-lg": "0 10px 40px rgba(5, 114, 230, 0.2)",
        codin: "0px 4px 17px 0px #00000008",
        feature: "0px 72px 129px 0px #0000001a",
      },
      backgroundImage: {
        hero: "linear-gradient(120deg, #0572e6 0%, #0d1219 100%)",
      },
      lineHeight: {
        130: "130%",
        140: "140%",
        180: "180%",
      },
      fontSize: {
        hero: ["clamp(2rem, 6vw, 4rem)", { lineHeight: "110%" }],
        display: ["clamp(1.5rem, 5vw, 3rem)", { lineHeight: "120%" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
