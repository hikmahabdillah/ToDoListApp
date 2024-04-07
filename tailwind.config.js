/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      animation: { updown: "upndown 5s linear infinite" },
      keyframes: {
        upndown: {
          "0%, 100%": {
            transform: "translateY(0px) scale(1.1)",
          },
          "50%": {
            transform: "translateY(-30px) scale(1.1)",
          },
        },
      },
    },
  },
  plugins: [],
};