var ExtractPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract("style", "css!postcss!sass")
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
