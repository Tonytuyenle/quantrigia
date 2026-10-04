/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48', // Lock&King Red Primary
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a', // Sidebar Dark Navy
          950: '#020617',
        },
        surface: {
          light: '#f8fafc',
          card: '#ffffff',
          dark: '#1e293b',
          cardDark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
