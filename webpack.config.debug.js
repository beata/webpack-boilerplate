var webpack = require('webpack')
var config = require('./webpack.config')

var HOT = (process.env.BABEL_ENV === 'hot')

if (!HOT) {
  var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
}

// update webpack config
Object.assign(config, {
  debug: true,
  devtool: 'eval',
  watch: true,
  browserSync: {
    port: 3000,
    server: { baseDir: ['dist'] },
    open: false
  }
})

Object.assign(config.output, {
  pathinfo: true
})

if (HOT) {
  config.entry.main.unshift(
    'webpack-hot-middleware/client'
  )

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
} else {
  config.plugins.unshift(new BrowserSyncPlugin(config.browserSync))
}

module.exports = config
