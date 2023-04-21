
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    module: {
      rules: [
        { test: /.(css|less)$/,
          use: [ "style-loader",
            {loader: "css-loader",options: {modules:false}},
            {loader: 'postcss-loader',options: {postcssOptions: {plugins: ['autoprefixer']}}},
            {loader: 'less-loader', options: {
                lessOptions: {
                  // 样式 js 编译功能，formily 需要使用
                  javascriptEnabled: true
                }
              }
            },
          ]
        },
        { test: /.(s[ac]ss)$/,use: ['sass-loader']},
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'css/[name].[contenthash].css'})
    ],
    //优化配置
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
                        warnings: false,
                        // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                        // drop_console: true,
                        drop_debugger: true,
                        // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
                        collapse_vars: true,
                        // 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                        reduce_vars: true,
                        // pure_funcs: ['console.log'] // 移除console
                    }
                }
            })
        ]
    },
    mode: 'production'
}
