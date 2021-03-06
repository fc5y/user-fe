const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

const { root, constants } = require('./config');

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
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
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(root, 'src', 'shared', 'styles')],
              },
            },
          },
        ],
      },
    ],
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
    new CopyPlugin({
      patterns: [
        {
          from: path.join(constants.ASSETS_PATH, 'images/cms_helper'),
          to: path.join(constants.PUBLIC_PATH, 'assets/images/cms_helper'),
        },
        {
          from: path.join(constants.ASSETS_PATH, 'images/join_helper'),
          to: path.join(constants.PUBLIC_PATH, 'assets/images/join_helper'),
        },
      ],
    }),
  ],
});
