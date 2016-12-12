'use strict';

var path              = require('path')
  , webpack           = require('webpack')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , pkg               = require('../package.json')
  , ignoreVendors     = [ ];

module.exports = {
  entry   : {
    app : [
      path.resolve(__dirname, '../app'),
    ],
    vendor : Object.keys(pkg.dependencies).filter(function (vendor) { return !~ignoreVendors.indexOf(vendor); }),
  },
  resolve : {
    modulesDirectories : [ 'node_modules', '../app' ],
    extensions         : [ '', '.js', '.jsx' ],
  },
  output : {
    path     : path.resolve(__dirname, '../build'),
    filename : '[name].bundle.js',
  },
  module : {
    preLoaders : [
      { test : /\.(css|scss)$/, loader : 'sasslint', exclude : /node_modules/ },
      { test : /\.(js|jsx)$/,   loader : 'eslint',   exclude : /node_modules/ },
    ],
    loaders : [
      { test : /\.(js|jsx)$/,                            loader : 'babel', exclude : /node_modules/ },
      { test: /\.(otf|eot|svg|ttf|woff|woff2|png|gif)$/, loader : 'url-loader?limit=8192' }
    ],
  },
  sasslint : {
    configFile : path.resolve(__dirname, 'sass-lint.yml'),
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      inject   : 'body',
      template : path.resolve(__dirname, '../app/index.html'),
    })
  ],
};
