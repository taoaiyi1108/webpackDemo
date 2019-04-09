const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //  最小化 CSS  build 打包后单独提取css

module.exports = {
    entry: {
        app: "./src/index.js",
        // another: './src/another-module.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Caching" // 页面title 
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HashedModuleIdsPlugin(), // 缓存 模块标识符
    ],
    output: {
        // filename: "[name].bundle.js",
        filename: '[name].[contenthash].js', // 缓存
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        /* SplitChunksPlugin 可以用于将模块分离到单独的 bundle 中。webpack 还提供了一个优化功能，可使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle */
        splitChunks:{
            cacheGroups: {
                // 提取引导模块
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all', //使用 optimization.splitChunks 配置选项，现在可以看到已经从 index.bundle.js 和 another.bundle.js 中删除了重复的依赖项。需要注意的是，此插件将 lodash 这个沉重负担从主 bundle 中移除，然后分离到一个单独的 chunk 中
                }
            }
        },
        runtimeChunk:'single'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    // 'style-loader',
                    'css-loader',

                ]
            },
        ]
    }
}