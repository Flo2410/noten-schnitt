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
        secondary: "#60a4d8",
        dark: "#212529",
        light: "#737373",
      },
      fontFamily: {
        fhwn: ["Oswald", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
