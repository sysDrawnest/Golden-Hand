/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'broto-dark':   '#111111',
        'broto-black':  '#000000',
        'broto-yellow': '#FFC107',
        'broto-grey':   '#333333',
        'broto-red':    '#D92323',
        'accent':       '#FFC107',
        'cta-red':      '#D92323',
        'primary':      '#000000',
        'secondary':    '#111111',
        'dark-gray':    '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
