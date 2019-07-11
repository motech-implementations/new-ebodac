const path = require('path');

const SRC_ROOT = path.resolve(__dirname, '../src/main/webapp');
const SRC = path.resolve(SRC_ROOT, 'js');
const DEST = path.resolve(__dirname, '../build/resources/main/static');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    path: DEST,
    filename: 'js/bundle.[contenthash].js',
    chunkFilename: 'js/bundle.[name].[contenthash].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[contenthash].css',
      chunkFilename: 'css/bundle.[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `${DEST}/index.html`,
      template: `${SRC_ROOT}/template.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader', 'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
