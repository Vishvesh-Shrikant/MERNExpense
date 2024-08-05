/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'mobileL':"480px",
        'mobileM':"430px",
        'mobileS':"375px"
      },
      fontFamily:{
        headings: ["Noto Serif", "serif"],
        texts:[ "Raleway", "sans-serif"]
      },
      padding:{
        sectionPadding:"4rem"
      },
      colors:{
        texts:"#EEEEEE",
        background:"#252627",
        income:"#09814A",
        expense:"#E90C2A"

      }
    },
  },
  plugins: [],
}