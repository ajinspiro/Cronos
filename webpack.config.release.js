let path = require('path');
let devConf = require('./webpack.config.dev');

let releaseConf = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist/release'),
    filename: 'cronos.js',
  },
  watch: false,
  node: {
    __dirname: false
  }
}

module.exports = Object.assign(devConf, releaseConf)