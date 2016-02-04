var pkg = require('./package.json')

var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var main = function (script, vars) {
  var scripts = [].concat(vars.polyfills)

  return scripts.concat(script)
}

var PRODUCTION = (process.env.NODE_ENV === 'production')
var STAGING = (process.env.NODE_ENV === 'staging')
var TEST = (process.env.NODE_ENV === 'test')

var output = {
  path: path.join(__dirname, 'dist'),
  publicPath: './',
  filename: 'js/[name].[hash].js'
}

var vars = {
  output: output,
  polyfills: [
    'babel-polyfill'
  ],
  constants: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      FAKE_TOKEN: JSON.stringify(process.env.FAKE_TOKEN),
      FIXTURE: JSON.stringify(process.env.FIXTURE)
    },
    VERSION: pkg.version,
    DEBUG: !PRODUCTION
  },
  providers: {
    // Automatically loaded modules. Module (value) is loaded when the identifier (key) is used as free variable in a module. The identifier is filled with the exports of the loaded module.
    // https://webpack.github.io/docs/list-of-plugins.html#provideplugin
    // _: 'lodash'
    React: 'react',
    ReactDOM: 'react-dom'
  },
  loaders: {
    js: {
      test: /\.jsx?$/,
      loader: 'babel-loader?cacheDirectory',
      include: [
        path.resolve(__dirname, 'src')
      ]
    },
    json: {
      test: /\.json$/,
      loader: 'json'
    }
  }
}

module.exports = {
  vars: vars,
  entry: {
    main: main('./src/js/main.js', vars)
  },
  output: vars.output,
  resolve: {
    root: path.join(__dirname, './src/js'),
    modulesDirectories: [ 'node_modules' ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      vars.loaders.js,
      vars.loaders.json
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
      minify: (PRODUCTION || STAGING) && {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[hash].js',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.join(__dirname, 'src')) === -1
      }
    }),
    new webpack.DefinePlugin(vars.constants),
    new webpack.ProvidePlugin(vars.providers)
  ]
}
