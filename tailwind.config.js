module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation:{
        bounce: 'bounce 3s infinite',
        spin: 'spin 2.5s infinite'
      },
      backgroundImage:{
        main: "url(https://wallpapercave.com/wp/wp5502848.jpg)",
        modal: "url(https://wallpapercave.com/wp/wp5288685.jpg)",
        test:"url(https://wallpapercave.com/wp/wp7213376.jpg)"
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    }
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus','focus-within','active'],
      scale: ['focus-within','active'],
      transform: ['group-hover']
    },
  },
  plugins: [],
}
