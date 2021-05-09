const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/,
        use: [
          {
            options: {
              outputPath: 'assets/',
              esModule: true,
            },
            loader: 'file-loader',
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
      assets: constants.ASSETS_PATH,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(root, 'public', 'index.ejs'),
      favicon: path.join(constants.ASSETS_PATH, 'images', 'logo.png'),
      imageMetaUrl: META_TAG.image_url,
      gitSHA: process.env.GIT_SHA,
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.ENV || 'test'),
    }),
    new CompressionPlugin(),
  ],
};
