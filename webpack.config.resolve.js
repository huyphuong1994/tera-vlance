const path = require('path');

module.exports = {
  alias: {
    '~': path.resolve(__dirname, './'),
    '@': path.resolve(__dirname, './src/'),
    src: path.resolve(__dirname, './src/'),
    pages: path.resolve(__dirname, './src/pages/'),
    styles: path.resolve(__dirname, './src/styles/'),
    routers: path.resolve(__dirname, './src/routers/'),
    states: path.resolve(__dirname, './src/states/'),
    _common: path.resolve(__dirname, './src/_common/'),
    _redux: path.resolve(__dirname, './src/_redux/'),
  },
  fallback: { url: false },
  extensions: ['.tsx', '.ts', '.js'],
  modules: [path.join(__dirname, 'app'), 'node_modules'],
};
