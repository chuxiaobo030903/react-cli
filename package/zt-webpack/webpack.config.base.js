const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin")
const WebpackBar = require('webpackbar');
const webpack = require('webpack');

module.exports = {
  entry: {
    'jwzx': './src/index.tsx'
  },
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: 'js/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
              options: {
                  presets: [
                      "@babel/preset-env",
                      "@babel/preset-react",
                      "@babel/preset-typescript"
                  ],
                  plugins: [
                      [
                          "@babel/plugin-transform-runtime",
                          {regenerator: true},
                      ],
                  ],
              }
          }
      },
      {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|svg|txt)$/i,
          type: "asset/resource",
          generator: {
            filename: 'static/[hash][ext][query]'
          },
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js'],
    //别名配置
    alias: {
      '@': resolve(__dirname, '../../src'),
      '@config': resolve(__dirname, '../../config'),
      '@assets': resolve(__dirname, '../../src/assets'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['jwzx'],
      // minify: {
      //   collapseWhitespace: true, //去空格
      //   removeComments: true // 去注释
      // }
    }),
    new CopyPlugin({patterns:[{from:'public',to:'./public'}]}),
    new webpack.ProvidePlugin({"React": "react"}),
    new WebpackBar()
  ],
  //性能如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: {
    hints: false
  },
}

