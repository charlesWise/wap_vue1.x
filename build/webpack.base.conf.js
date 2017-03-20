var path = require('path')
var webpack = require("webpack")
var cssLoaders = require('./css-loaders')
var vue = require("vue-loader")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      //{
      //  test: /\.vue$/,
      //  loader: 'eslint',
      //  include: projectRoot,
      //  exclude: /node_modules/
      //},
      //{
      //  test: /\.js$/,
      //  loader: 'eslint',
      //  include: projectRoot,
      //  exclude: /node_modules/
      //}
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", "css-loader?sourceMap!cssnext-loader")
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  vue: {
    css: ExtractTextPlugin.extract("css"),
    sass: ExtractTextPlugin.extract("css!sass-loader")
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
