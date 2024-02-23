/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'roxoescuro': '#4f518c',
      'roxomaisclaro': '#e9d5ff',
      'roxomaisescuro': '#2c2a4a',
      'fundo': '#faf5ff',
      'fundoPlaceholder': '#fafafa',
      'branco': '#f8fafc',
      'preto': '#020202'
    },
    fontFamily: {
      'anton': ['Anton'],
      'montserrat': ['Montserrat'],
    },
  },
  plugins: [],
}

