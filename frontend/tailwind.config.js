/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
      'poppins' : ['Poppins','sans-serif'],
    },colors:{
      sky:{
        edited:{
          500:"#007DFE"
        }
      }
    }
  },
  },
  plugins: [],
}

