/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        yellow: { DEFAULT: '#FACC15', dark: '#EAB308' },
        brown: { DEFAULT: '#78350F', light: '#92400E' },
        purple: { DEFAULT: '#A855F7', dark: '#7E22CE' },
      },
    },
  },
  plugins: [],
}
