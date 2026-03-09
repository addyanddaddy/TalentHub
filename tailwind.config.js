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
        // Slate + steel blue palette — #AEB6BF background, #1B62B3 surfaces, #222526 base text
        navy: {
          950: "#AEB6BF",
          900: "#1B62B3",
          800: "#17569E",
          700: "#124681",
          600: "#0E3766",
          500: "#092A4D",
          400: "#72869B",
          300: "#5A6A79",
          200: "#3F4D59",
          100: "#222526",
        },
        accent: {
          DEFAULT: "#B57A1C",
          light: "#CF9841",
          dark: "#8F5F15",
          glow: "rgba(181, 122, 28, 0.18)",
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
