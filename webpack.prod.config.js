var webpack = require('webpack');
var baseConfig = require('./webpack.config.js')


let plugins = [
  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]

baseConfig.plugins = plugins.concat(baseConfig.plugins)

module.exports = baseConfig