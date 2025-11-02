const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ja-vi-primary": "#163300",
        "ja-vi-secondary": "#9FE870",
        "ja-vi-background": "#F8F8F8",
      },
      fontFamily: {
        manrope: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
