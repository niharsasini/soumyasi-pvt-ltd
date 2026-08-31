/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        "#FFFBF0",
          section:   "#FFF8E7",
          card:      "#ffffff",
          elevated:  "#FEF3C7",
          gold:      "#d97706",
          "gold-lt": "#f59e0b",
          "gold-dk": "#b45309",
          emerald:   "#059669",
          ink:       "#1a1208",
          dark:      "#1a1208",
          brown:     "#78614a",
          muted:     "#a8917a",
          border:    "#e8d5b0",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)",    "Inter",  "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-gradient":   "linear-gradient(135deg, #f59e0b, #d97706)",
      },
      animation: {
        "float":        "float 7s ease-in-out infinite",
        "spin-slow":    "spin 18s linear infinite",
        "spin-reverse": "spinReverse 24s linear infinite",
        "pulse-ring":   "pulseRing 3s ease-in-out infinite",
        "shimmer":      "shimmer 0.7s ease forwards",
        "pulse-glow":   "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        spinReverse: {
          from: { transform: "rotate(360deg)" },
          to:   { transform: "rotate(0deg)" },
        },
        pulseRing: {
          "0%,100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":     { opacity: "0.8", transform: "scale(1.04)" },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 15px rgba(217,119,6,0.3)" },
          "50%":     { boxShadow: "0 0 30px rgba(217,119,6,0.6)" },
        },
      },
      boxShadow: {
        "gold":       "0 4px 15px rgba(217,119,6,0.3)",
        "gold-lg":    "0 8px 32px rgba(217,119,6,0.4)",
        "warm":       "0 4px 24px rgba(120,80,20,0.08)",
        "warm-lg":    "0 8px 32px rgba(120,80,20,0.12)",
        "card-hover": "0 8px 32px rgba(217,119,6,0.15)",
      },
    },
  },
  plugins: [],
};
