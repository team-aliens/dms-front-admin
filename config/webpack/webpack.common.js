'use strict';

const paths = require('./paths.js');
const getClientEnvironment = require('./env.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  //entry: 시작점
  entry: paths.appIndex,

  //output: 내보낼 위치
  //[hash][ext][query] 이게 뭐지? hash = 난수와 알파벳 ext = Filename Extension query = Query with leading?
  output: {
    path: paths.appBuild,
    assetModuleFilename: 'static/media/[hash][ext][query]',
  },

  //이 옵션은 프로젝트 내에서 다른 유형의 모듈을 처리하는 방법을 결정합니다.
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

  //플러그인을 사용하여 다양한 작업 가능
  plugins: [
    //새로 빌드했을 때 전에 빌드했던 내용 삭제
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      inject: true,
      templateParameters: env.raw,
    }), //html-webpack-plugin은 생성된 모든 번들을 자동으로 삽입하여 애플리케이션용 HTML 파일을 생성합니다.
    new webpack.DefinePlugin(env.stringified),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.appSource,
    },
  },
};
