'use strict'
const path=require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const webpackConfig = merge.merge(baseWebpackConfig, {
    mode: "production",
    output: {
        filename: 'public/bundle.js',//定义输出文件名称
        path: path.resolve(__dirname, '../dist'),//定义输出文件路径
        publicPath: "../",
        assetModuleFilename: "public/[hash][ext]"
    }
})


module.exports = webpackConfig
