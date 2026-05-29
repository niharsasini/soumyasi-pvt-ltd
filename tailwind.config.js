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
          primary: "#1d4ed8",      // blue-700  — primary actions, headings
          primaryDark: "#1e40af",  // blue-800  — primary hover
          primaryDeep: "#172554",  // blue-950  — hero gradient stops
          accent: "#eab308",       // yellow-500 — CTAs, accents
          accentDark: "#ca8a04",   // yellow-600 — accent hover/labels
          cyan: "#22d3ee",         // cyan-400  — hero highlight
          dark: "#0f172a",         // slate-900 — dark backgrounds
          darker: "#020617",       // slate-950 — deepest backgrounds
          ink: "#0f172a",          // body text on light
          surface: "#f9fafb",      // gray-50  — section backgrounds
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}
