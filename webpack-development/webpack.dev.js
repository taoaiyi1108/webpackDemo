const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-soure-map",
    devServer: {
        contentBase: './dist'
    }
})