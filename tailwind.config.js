/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom drop shadow for glow effect
      dropShadow: {
        glow: ["0 0px 20px rgba(255, 255, 255, 0.35)", "0 0px 65px rgba(255, 255, 255, 0.2)"],
      },
      // Custom animations
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      // Custom container sizes
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};
