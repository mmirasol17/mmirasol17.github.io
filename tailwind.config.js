module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {},

      // for animations
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [],
};
