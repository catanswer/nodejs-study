const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 环境
  mode: 'development',

  devtool: 'source-map',

  // 入口
  entry: {
    'js/app': './src/app.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.art$/,
        use: {
          loader: 'art-template-loader'
        }
      }
    ]
  },

  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
      // 注入的方式
      inject: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public/favicon.ico'),
          to: path.resolve(__dirname, './dist')
        },
        {
          from: path.resolve(__dirname, './public/css/'),
          to: path.resolve(__dirname, './dist/css')
        },
        {
          from: path.resolve(__dirname, './public/js/'),
          to: path.resolve(__dirname, './dist/js')
        },
        {
          from: path.resolve(__dirname, './public/fonts/'),
          to: path.resolve(__dirname, './dist/fonts')
        },
        {
          from: path.resolve(__dirname, './public/img/'),
          to: path.resolve(__dirname, './dist/img')
        }
      ]
    })
  ]
}