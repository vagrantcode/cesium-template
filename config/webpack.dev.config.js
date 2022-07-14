// webpack.dev.config.js

const merge = require("webpack-merge").merge;
const baseWebpackConfig = require('./webpack.base.config')
const webpackDevConfig = merge(baseWebpackConfig,{
    mode: "development",

})
module.exports = webpackDevConfig
