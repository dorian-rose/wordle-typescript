/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#DFBD43',
        'secondary': '#4C4117',
        'tertiary': '#F9FCF5',
        'alert': '#781313',
      }
    },
  },
  plugins: [],
}

