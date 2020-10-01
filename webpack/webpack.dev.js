const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.resolve(__dirname, '../');

module.exports = {
  entry: path.join(root, 'src', 'index.js'),
  output: {
    path: path.join(root, 'build'),
    filename: 'bundle.js',
  },
  mode: 'development',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.md$/i,
        use: [
          {
            loader: 'raw-loader',
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(root, 'public', 'index.html'),
      favicon: path.join(root, 'manifest', 'favicon.png'),
    }),
  ],
};
