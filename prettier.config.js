/** @type {import("prettier").Options} */
const config = {
  tabWidth: 2,
  useTabs: false,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  pluginSearchDirs: false,
  tailwindFunctions: ["clsx"],
};

export default config;
