const colors = {
  theme: {
    green: '#748873'
  }
}

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        'moon-dance': 'Moon Dance, cursive'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}