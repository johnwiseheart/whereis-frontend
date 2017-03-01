var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var baseConfig = require('./webpack.config.js')

let entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
]

let plugins = [
  new webpack.HotModuleReplacementPlugin()
]

baseConfig.devtool = 'eval'

baseConfig.entry = entry.concat(baseConfig.entry)

baseConfig.plugins = plugins.concat(baseConfig.plugins)

module.exports = baseConfig