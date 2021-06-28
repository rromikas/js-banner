const sizes = {
  "42px": "42px",
  "250px": "250px",
  "600px": "600px",
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      lineHeight: sizes,
      colors: {
        green: {
          200: "#C7EDE0",
          201: "#AFDECE",
          400: "#2AB988",
        },
      },
      keyframes: {
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadein: "fadein 200ms linear forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
