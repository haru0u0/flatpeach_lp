/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff8f3',
          100: '#feeee3',
          200: '#fcd9c0',
          300: '#f9bc93',
          400: '#f49764',
          500: '#ee7540',
          600: '#d9582a',
          700: '#b54222',
          800: '#903525',
          900: '#752e22',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
