'use strict';

const paths = require('./paths.js');
const getClientEnvironment = require('./env.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  entry: paths.appIndex,
  output: {
    path: paths.appBuild,
    assetModuleFilename: 'static/media/[hash][ext][query]',
    filename: 'build.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|png)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      inject: true,
      templateParameters: env.raw,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: '.',
          globOptions: {
            ignore: ['*/**/index.html'],
          },
        },
      ],
    }),
    new webpack.DefinePlugin(env.stringified),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.appSource,
    },
  },
};
