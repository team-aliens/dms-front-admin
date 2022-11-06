'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'static/js'),
    filename: 'build.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    static: path.join(__dirname, '../build'),
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
