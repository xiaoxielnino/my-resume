const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const args = process.argv
const debug = args.indexOf('--debug') > -1
const output = {
  path: path.resolve(__dirname, './dist'),
  filename: '[name].[hash].js'
}

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    hash: true,
    template: path.resolve(__dirname, './src/index.html')
  }),
  new ExtractTextPlugin('[name].[hash].css')
]

if (!debug) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js'
  },
  output: output,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true
  },
  plugins: plugins
}
