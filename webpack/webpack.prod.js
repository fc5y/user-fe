const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const root = path.resolve(__dirname, '../');
const { META_TAG } = require('./config');

module.exports = {
  stats: {
    entrypoints: false,
  },
  entry: path.join(root, 'src', 'index.js'),
  output: {
    path: path.join(root, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
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
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[name].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(root, 'public', 'index.ejs'),
      favicon: path.join(root, 'src', 'assets', 'images', 'logo.png'),
      imageMetaUrl: META_TAG.image_url,
    }),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(process.env.ENV || 'prod'),
    }),
  ],
};
