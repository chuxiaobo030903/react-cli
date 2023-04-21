//代码类型检查插件
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// webpack编译代码检查插件
// const ESLintPlugin = require('eslint-webpack-plugin');

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
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        static: '../dist',
        compress: true,
        port : 3000,
        open : true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({async: false}),
        // new ESLintPlugin({extensions: ["js", "jsx", "ts", "tsx"]}),
    ]
}
