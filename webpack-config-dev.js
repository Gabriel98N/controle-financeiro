const path = require('path');

module.exports = {
  mode: 'development',
  entry: '/js/script',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'main.js'
  }
}