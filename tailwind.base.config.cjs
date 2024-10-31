/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        display: ['Lato', 'sans-serif'],
      },
      screens: {
        mobile: { max: '767px' },
      },
      maxWidth: {
        content: '1440px',
      },
      fontSize: {
        xxs: [
          '0.65rem',
          {
            lineHeight: '1rem',
          },
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
