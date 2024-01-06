module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      // for glow effect
      dropShadow: {
        glow: ["0 0px 20px rgba(255,255, 255, 0.35)", "0 0px 65px rgba(255, 255,255, 0.2)"],
      },
      // for fade in animation
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [],
};
