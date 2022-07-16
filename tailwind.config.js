module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
      boxShadow: {
        fhwn: "0px 3px 6px rgb(0 0 0 / 10%)",
      },
      colors: {
        primary: "#163072",
        secondary: "#86B9E1",
        dark: "#212529",
        light: "#737373",
      },
      fontFamily: {
        fhwn: ["Oswald", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    styled: true,
    base: false,
    utils: false,
  },
};
