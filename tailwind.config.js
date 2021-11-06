module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation:{
        bounce: 'bounce 2.5s infinite',
        spin: 'spin 2.5s infinite'
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    }
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus','focus-within'],
      scale: ['focus-within'],
    },
  },
  plugins: [],
}
