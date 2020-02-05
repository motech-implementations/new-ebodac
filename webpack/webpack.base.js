const path = require('path');

const SRC_ROOT = path.resolve(__dirname, '../src/main/webapp');
const SRC = path.resolve(SRC_ROOT, 'js');
const DEST = path.resolve(__dirname, '../build/resources/main/static');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  entry: `${SRC}/index.jsx`,
  output: {
    path: `${DEST}/site`,
    filename: 'js/bundle.[contenthash].js',
    chunkFilename: 'js/bundle.[name].[contenthash].js',
    publicPath: '/site/',
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
    new CopyPlugin([
      {
        from: `${SRC_ROOT}/manifest.json`,
        to: DEST,
      },
      {
        from: `${SRC_ROOT}/images/`,
        to: `${DEST}/images/`,
      },
    ]),
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
