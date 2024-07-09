/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", 
            './Html/**/*.{html,js}'],
  theme: {
    extend: {
      colors:{
        exportColor: '#ECE8DD',
        cards: '#D9D9D9',
        background: '#F5F2EB'
      }
    },
  },
  plugins: [],
}


