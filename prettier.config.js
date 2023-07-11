module.exports = {
  tabWidth: 2,
  useTabs: false,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  pluginSearchDirs: false,
  tailwindFunctions: ["clsx"],
};
