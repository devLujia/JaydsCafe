/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", 
            './Html/**/*.{html,js}',
            "./node_modules/flowbite/**/*.js",
          "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        exportColor: '#ECE8DD',
        cards: '#D9D9D9',
        background: '#F5F2EB',
        footer: '#333335',
        cards2: '#F0F0F0',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


