var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {

  entry: [
    'index.tsx'
  ],
  output: {
    filename: 'app.js',
    publicPath: '/dist',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['src', 'node_modules', '.'],
  },
  module: {
    loaders: [
      // .ts(x) files should first pass through the Typescript loader, and then through babel
      { test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ]
};