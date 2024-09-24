/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B0000',      // Custom Primary Color
        secondary: '#6B0000',    // Custom Secondary Color
        ternary: '#520000',
        button:'#631A1A',      // Custom Ternary Color
        quaternary: '#CFC5C5', 
        bg: '#4B0000',
        bgblack: '#0A0A0A',
        bgSecondary: '#220A0A',
      },
    },
  },
  plugins: [],
}
