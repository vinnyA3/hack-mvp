const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.join(__dirname, './client/src');
const PORT = 8000;

module.exports = {
  mode: 'development',
  entry: [`${SRC_DIR}/app.js`],
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
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', `${SRC_DIR}`],
    extensions: ['.js', '.jsx', '.scss', '.js', '.json'],
  },
  devtool: 'inline-sourcemap',
  target: 'web',
  devServer: {
    port: process.env.PORT || PORT,
    compress: true,
    contentBase: path.join(__dirname, './public'),
  },
};
