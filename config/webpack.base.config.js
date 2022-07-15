// webpack.dev.config.js
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolve = require('./utils').resolve
const cesiumConfig = require('./cesium.config')
module.exports = {
    entry: './src/main.js',//定义入口文件
    amd: cesiumConfig.config.amd,

    stats: "errors-only",
    devServer: {//配置webpack-dev-server（开发环境用的热部署）
        host: "localhost",//定义主机
        port: 8000,//定义端口号
        open: false//定义是否自动打开页面
    },
    module: Object.assign({
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, "css-loader"],
                include: [resolve('src')]
            },
            // 配置less处理
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, "css-loader", "less-loader", "sass-loader"],
                include: [resolve('src')]
            },
            {
                test: /\.scss$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, "css-loader", "sass-loader"],
                include: [resolve('src')]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "public/font/[name].[hash:6][ext]"
                }
            },
            {
                test: /\.(jpg|png|svg)$/i,
                type: 'asset/resource',
                 generator: {
                     filename: "public/img/[name].[hash:6][ext]"
                 }
            },
        ]
    }, cesiumConfig.config.module),
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html"
        }),//配置此插件会自动生成一个index.html并且自动引入bundle.js从而我们无需关心bundle.js的路径问题。
        new MiniCssExtractPlugin({
            filename:"public/css/[contenthash].css",
            ignoreOrder:true
        }),
        ...cesiumConfig.config.plugins
    ]
};
