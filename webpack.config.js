var ExtractPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333,
    contentBase: 'public'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract("style", "css!postcss!sass")
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  plugins : [
    new ExtractPlugin('./styles.css')
  ]
}
