'use strict';

var base              = require('./webpack.config.base.js')
  , webpack           = require('webpack')
  , path              = require('path')
  , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(base, {
  devtool : 'cheap-module-eval-source-map',
  entry   : Object.assign(base.entry, {
    app : base.entry.app.concat(
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ),
  }),
  module  : Object.assign(base.module, {
    loaders : base.module.loaders.concat({ test : /\.(css|scss)$/,  loader : 'style!css!sass' }),
  }),
});
