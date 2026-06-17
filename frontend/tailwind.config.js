export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#F8F6F1',
        charcoal: '#1A1A2E',
        green: {
          dark: '#35694D',
          light: '#90E4A1',
        },
        terra: '#C4622D',
        card: '#FFFFFF',
        subtle: '#F0EDE8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}