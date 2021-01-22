
/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

  var plugins = [
    new ExtractTextPlugin('static/css/[name].[hash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    })
  ];

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['react-css-modules', {
                  context: path.join(__dirname, 'src'),
                  generateScopedName: '[name]__[local]'
                }]
              ],
              presets: ['es2015', 'react', 'stage-2']
            }
          }
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000000,
            }
          }
        },
        {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }]
        }

      ]
    },
    plugins
  };
};

