/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      animation: {
        updown: "upndown 5s linear infinite",
        loader: "loader 1.5s infinite",
      },
      keyframes: {
        loader: {
          "0%, 100%": {
            borderRadius: "50%",
            transform: "scale(1)",
            opacity: 0.6,
          },
          "50%": {
            borderRadius: "10px",
            transform: "scale(1.15)",
            opacity: 1,
          },
        },
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
  plugins: [require("flowbite/plugin")],
};
