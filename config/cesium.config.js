const webpack=require('webpack')
const path = require('path');
const utils = require('./utils')
// Cesium源码所在目录
const cesiumSource = 'node_modules/cesium/Source'
const dirCesiumSource = '../node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
const CopyWebpackPlugin = require('copy-webpack-plugin')
exports.config = {
    amd: {
        toUrlUndefined: true
    },
    plugins: [
        // 拷贝Cesium 资源、控价、web worker到静态目录
        new CopyWebpackPlugin({
            patterns:[{from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]
        }),
        new CopyWebpackPlugin({patterns:[{from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]}),
        new CopyWebpackPlugin({patterns:[{from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]}),
        new CopyWebpackPlugin({patterns:[{from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty'}]}),
        new CopyWebpackPlugin({patterns:[{from: path.join(cesiumSource, 'Core'), to: 'Core'}]}),
        new CopyWebpackPlugin({patterns:[{from: 'public', to: 'public'}]}),
        new webpack.DefinePlugin({
            //Cesium载入静态的资源的相对路径
            CESIUM_BASE_URL: JSON.stringify('')
        }),
    ],
    module:{
        unknownContextCritical:false
    }
}
