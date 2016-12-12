'use strict';

var base              = require('./webpack.config.base.js')
  , webpack           = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , path              = require('path')
  , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(base, {
  module  : Object.assign(base.module, {
    loaders : base.module.loaders.concat({ test : /\.(css|scss)$/,  loader : ExtractTextPlugin.extract('css!sass') }),
  }),
  plugins : base.plugins.concat(
    new HtmlWebpackPlugin({
      filename : '404.html',
      inject   : 'body',
      template : path.resolve(__dirname, '../app/index.html'),
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor : {
        warnings : false,
      },
    })
  ),
});
