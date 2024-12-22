const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './Web/*.{js,ts,jsx,tsx}',
    './Web/public/**/*.{js,ts,jsx,tsx,html,css}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
