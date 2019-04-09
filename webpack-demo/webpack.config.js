const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // index.html 模板自动构建
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理 dist 文件夹
const webapck = require('webpack');

module.exports = {
    //mode: 'development', // 告诉webpack是开发环境  开发  build打包输出代码未压缩
    mode: 'production', // 生产 build打包输出代码压缩
    // entry: './src/index.js',
    entry: {
        // app: './src/index.js',
        // print: './src/print.js',
        app: './src/index.js'
    },
    devtool: 'inline-source-map', // inline-source-map 追踪运行错误文件 
    devServer: {
        contentBase: './dist', // webpack-dev-server 运行 npm run dev 就可以启动项目了 默认端口8080
        hot: true, // 模块热替换
    },
    plugins: [
        new CleanWebpackPlugin(),// options 默认dist文件中的所有文件都会在build产生新的文件之前都会被删除
        new HtmlWebpackPlugin({
            title: '管理输出'
        }),
        new webapck.HotModuleReplacementPlugin()
    ],
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    optimization: {  // 配置更改模块
        usedExports: true // 优化 生产默认true 打包代码压缩
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
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
}