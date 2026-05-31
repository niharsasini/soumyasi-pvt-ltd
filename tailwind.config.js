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
          primary: "#1d4ed8",
          primaryDark: "#1e40af",
          primaryDeep: "#172554",
          accent: "#22d3ee",
          accentDark: "#06b6d4",
          dark: "#0f172a",
          darker: "#020617",
          mid: "#080e1a",
          ink: "#0f172a",
          surface: "#f9fafb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-slow": "bounceSlow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(34,211,238,0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(34,211,238,0.5), 0 0 60px rgba(34,211,238,0.2)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(34,211,238,0.3)",
        "glow-cyan-lg": "0 0 40px rgba(34,211,238,0.4)",
        "glow-blue": "0 0 20px rgba(29,78,216,0.3)",
      },
    },
  },
  plugins: [],
}
