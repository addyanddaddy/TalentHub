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
        surface: {
          950: '#08080c',
          900: '#0f0f14',
          800: '#1a1a22',
          700: '#242430',
          600: '#2f2f3d',
          500: '#3d3d4a',
          400: '#52525e',
          300: '#6b6b78',
          200: '#8a8a96',
          100: '#b8b5a8',
        },
        // Backward-compatible alias
        navy: {
          950: '#08080c',
          900: '#0f0f14',
          800: '#1a1a22',
          700: '#242430',
          600: '#2f2f3d',
          500: '#3d3d4a',
          400: '#52525e',
          300: '#6b6b78',
          200: '#8a8a96',
          100: '#b8b5a8',
        },
        marble: {
          DEFAULT: '#edebe2',
          50: '#faf9f6',
          100: '#f5f4ef',
          200: '#edebe2',
          300: '#d8d5c9',
          400: '#b8b5a8',
          500: '#8a8a96',
        },
        bronze: {
          DEFAULT: '#9d7663',
          50: '#faf5f0',
          100: '#f0e4d8',
          200: '#dcc5ad',
          300: '#c4a47a',
          400: '#b08a6a',
          500: '#9d7663',
          600: '#7a5c48',
          700: '#5c4536',
          800: '#3d2e24',
          900: '#1f1712',
        },
        accent: {
          DEFAULT: '#9d7663',
          light: '#c4a47a',
          dark: '#7a5c48',
          glow: 'rgba(157, 118, 99, 0.18)',
        },
        teal: {
          DEFAULT: '#aadbdf',
          light: '#c5e8eb',
          dark: '#7ab8be',
        },
        brand: {
          gold: '#c4a47a',
          silver: '#b8b5a8',
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
        reveal: "reveal 0.6s ease-out",
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
        reveal: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
