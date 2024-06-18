const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        whiteText: colors.gray[100],
        blackText: colors.gray[800],
        grayBackground: colors.gray[100],
        grayBorder: colors.gray[200],
        grayBorderDark: colors.gray[300],
        grayDisabled: colors.gray[400],
        grayText: colors.gray[500],
        grayTextDark: colors.gray[600],
        grayHeading: colors.gray[700],
        primaryHover: "#92400e",
        primarySelect: colors.white[200],
        primary: "#92400e",
        primaryLight: "#92400e",
        secondary: colors.amber[700],
        secondarySelect: colors.amber[200],
        danger: colors.rose[700],
        dangerDark: colors.rose[800],
      },
      boxShadow: {
        r: '1px 0 10px -5px rgba(115,115,115,0.75)',
      },
    },
  },
  plugins: [],
};
