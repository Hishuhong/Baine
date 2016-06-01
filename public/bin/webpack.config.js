var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var alias = require('./alias');
var rmDir = require('./rmDir');
var compile = require('./compile');
var compileConfig = require('../app/compile.config.json');
compileConfig = compile(compileConfig);
var env = process.env.NODE_ENV;
var containerPath = path.resolve('./');
var config = {};
var plugins = [];
var CSS_NAME = '';
var FILE_NAME = '';
var LIBS = '';

if (env === 'dev') {
  CSS_NAME = '[name].css';
  FILE_NAME = '[name].js';
  LIBS = '[name].js';
}

if (env === 'product') {
  CSS_NAME = '[name]-[hash].css';
  FILE_NAME = '[name]-[hash].js';
  LIBS = '[name]-[hash].js';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings:false
    }
  }));
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
  console.log('清理www目录中....');
  rmDir('./www');
}

var extractSASS = new ExtractTextPlugin(CSS_NAME);
plugins.push(extractSASS);
plugins.push(new webpack.optimize.CommonsChunkPlugin('commons','libs-' + LIBS));

var conf = {
  filename: 'index.html',
  template: './app/web/index.jade',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: false
  },
  chunks: ['commons','app'],
  hash: false,
  complieConfig: compileConfig
}
var titleC = compileConfig.title || {};
var title = titleC.index;
if (title) {
  conf.title = title;
}
plugins.push(new HtmlWebpackPlugin(conf));

var config = {
  entry: {
    app: './app/index.js',
    commons: ['react','react-dom','react-router','classnames'],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(containerPath+'/www'),
    filename: FILE_NAME
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['react','es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: extractSASS.extract(['css','sass']),
        exclude: /(node_modules)/
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
      }
    ]
  },
  plugins: plugins,
  resolve: {
    alias: alias,
    extensions: ['', '.js', '.css', '.scss', '.jade', '.png', '.jpg']
  },
  externals: {
    jquery: 'window.jQuery'
  }
};
module.exports = config;
