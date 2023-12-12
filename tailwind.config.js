/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.blade.php', './resources/**/*.{js,jsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              margin: '0 !important',
            },
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
