// TailwindCSS Configuration: We tell you where to look for classes and how to customize your theme.
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // We scan all React and TSX files to purge unused classes
  theme: {
    extend: {},
    // Here you can add colors, spacing or fonts without altering the core.
  },
  plugins: [],
  // We can add plugins to extend Tailwind's functionality.
};