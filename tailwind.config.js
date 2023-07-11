module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
      boxShadow: {
        fhwn: "0px 3px 6px rgb(0 0 0 / 10%)",
        "fhwn-white": "0px 0px 10px rgb(255 255 255 / 10%)",
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
  plugins: [
    require("daisyui"),
    ({ addBase, theme }) => {
      if (process.env.NODE_ENV === "production") return;

      const screens = theme("screens", {});
      const breakpoints = Object.keys(screens);

      addBase({
        "body::after": {
          content: `"Current breakpoint default (< ${screens[breakpoints[0]]})"`,
          position: "fixed",
          right: ".5rem", // could replace with theme('spacing.2', '.5rem'), same for most of the other values
          bottom: ".5rem",
          padding: ".5rem .5rem .5rem 2rem",
          background:
            "no-repeat .5rem center / 1.25rem url(https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+tailwind-1324451500323172563.png), #edf2f7",
          border: "1px solid #cbd5e0",
          color: "#d53f8c",
          fontSize: ".875rem",
          fontWeight: "600",
          zIndex: "99999",
        },
        ...breakpoints.reduce((acc, current) => {
          acc[`@media (min-width: ${screens[current]})`] = {
            "body::after": {
              content: `"Current breakpoint ${current}"`,
            },
          };
          return acc;
        }, {}),
      });
    },
  ],
  daisyui: {
    themes: ["light", "dark"],
    styled: true,
    base: false,
    utils: false,
  },
};
