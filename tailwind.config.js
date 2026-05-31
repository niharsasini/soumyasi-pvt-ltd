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
          bg:        "#0a0f1e",
          surface:   "#111827",
          border:    "#1f2937",
          gold:      "#f59e0b",
          "gold-lt": "#fbbf24",
          "gold-dk": "#d97706",
          green:     "#10b981",
          "grn-dk":  "#059669",
          blue:      "#3b82f6",
          "blue-dk": "#2563eb",
          text:      "#f9fafb",
          muted:     "#9ca3af",
          dark:      "#0a0f1e",
          darker:    "#020617",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)",    "Inter",  "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-gradient":   "linear-gradient(135deg, #fbbf24, #d97706)",
      },
      animation: {
        "float":        "float 7s ease-in-out infinite",
        "spin-slow":    "spin 18s linear infinite",
        "spin-reverse": "spinReverse 24s linear infinite",
        "pulse-ring":   "pulseRing 3s ease-in-out infinite",
        "shimmer":      "shimmer 0.7s ease forwards",
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
      },
      boxShadow: {
        "gold":    "0 0 24px rgba(245,158,11,0.3)",
        "gold-lg": "0 0 48px rgba(245,158,11,0.4)",
        "grn":     "0 0 24px rgba(16,185,129,0.3)",
        "blue":    "0 0 24px rgba(59,130,246,0.3)",
      },
    },
  },
  plugins: [],
};
