/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#2C2B2B",
          black: "#1B1B1B",
          text: "#FFFBFB",
          orange: "#FF9505",
          gray: "#F2F1F1",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      fontFamily: {
        first: ["Playfair Display", "serif"],
        second: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        bg: "url('/src/constants/images/bg.jpg')",
        signup: "url('/src/constants/images/signup.jpg')",
        login: "url('/src/constants/images/login.jpg')",
        about: "url('/src/constants/images/about.png')",
        cta: "url('/src/constants/images/cta.png')",
      },
    },
  },
  plugins: [],
};
