const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.join(__dirname, './client/src');
const PUBLIC_DIR = path.join(__dirname, './client/public');
const PORT = 8000;

module.exports = env => ({
  mode: 'development',
  entry: [SRC_DIR + '/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        use: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: true,
              sourceMap: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: require(SRC_DIR + '/sass/index.js'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', SRC_DIR],
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
  },
  devtool: 'inline-sourcemap',
  target: 'web',
  devServer: {
    port: PORT,
    compress: true,
    contentBase: PUBLIC_DIR,
  },
});
