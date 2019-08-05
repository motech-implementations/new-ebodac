const path = require('path');

const SRC_ROOT = path.resolve(__dirname, '../src/main/webapp');
const SRC = path.resolve(SRC_ROOT, 'js');
const DEST = path.resolve(__dirname, '../build/resources/main/static');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

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
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: `${SRC_ROOT}/src-sw.js`,
      swDest: `${DEST}/sw.js`,
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
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
