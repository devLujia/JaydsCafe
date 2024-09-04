/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", 
            './Html/**/*.{html,js}',
            "./node_modules/flowbite/**/*.js",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
            // Or if using `src` directory:
            "./src/**/*.{js,ts,jsx,tsx,mdx}",
          ],
  theme: {
    extend: {
      colors:{
        btnBgColor: '#3D1A08',
        exportColor: '#ECE8DD',
        cards: '#D9D9D9',
        background: '#F5F2EB',
        footer: '#333335',
        cards2: '#F0F0F0',
        greenColor: '#067741',
        textgreenColor: '#017242',
        jaydsBg: '#e3ded6',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      datatables:true,
      charts: true,
    }),
  ],
  
  
}


