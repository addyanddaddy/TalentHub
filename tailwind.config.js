/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stake.us inspired palette — deep navy + teal accents
        navy: {
          950: "#071018",
          900: "#0D1B25",
          800: "#0F1923",
          700: "#1A2C38",
          600: "#213743",
          500: "#2F4553",
          400: "#3D5564",
          300: "#557086",
          200: "#7B98A9",
          100: "#B1C5D0",
        },
        accent: {
          DEFAULT: "#00E701",
          light: "#1FFF20",
          dark: "#00C301",
          glow: "rgba(0, 231, 1, 0.15)",
        },
        brand: {
          gold: "#F59E0B",
          silver: "#94A3B8",
          teal: "#00D4AA",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
