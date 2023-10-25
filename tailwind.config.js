module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tera-dls/**/*.js'],
  theme: {
    extend: {
      borderRadius: {
        xsm: '3px',
      },
      boxShadow: {
        xsm: '0px 2px 2px 0px rgba(17, 24, 39, 0.10)',
        smd: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        xxs: ['0.813rem', '0.983rem'],
      },
      gray: {
        800: '#1F2229',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
