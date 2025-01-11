/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#302E2F',
        secondaryColor: '#D99578',
        tertiaryColor: '#F4ECE9',
      },
      fontFamily: {
        prata: ['Prata', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

