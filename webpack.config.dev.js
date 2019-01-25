var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/cronos.ts',
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: 'cronos.debug.js'
  },
  module: {
      rules: [{
          test: /\.ts$/,
          use: [
              { loader: 'ts-loader' }
          ]
      }]
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  watch: true,
  node: {
    __dirname: false
  }
};
