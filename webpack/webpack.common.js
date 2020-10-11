const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { root, constants, META_TAG } = require('./config');

module.exports = {
  entry: path.join(root, 'src', 'index.js'),
  output: {
    path: path.join(root, 'build'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.md$/i,
        use: ['raw-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      src: path.resolve(root, 'src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(root, 'public', 'index.ejs'),
      favicon: path.join(root, 'src', 'assets', 'images', 'logo.png'),
      imageMetaUrl: META_TAG.image_url,
      gitSHA: constants.__GIT_SHA__,
    }),
    new webpack.DefinePlugin({
      __ENV__: constants.__ENV__,
    }),
  ],
};
