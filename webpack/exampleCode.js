const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const {srcPath, distPath} = require('./paths');

module.exports = {
    mode: 'development',
    // 仅仅在开发环境下配置 dllplugin 加快构建效率
    entry:{
        // 把 react 相关模块放到一个单独的动态链接库中
        react: ['react', 'react-dom'],
    },
    output: {
        // 输出动态链接库的文件名称,[name] 表示当前动态链接库的名称
        // 也就是 entry 中配置的 react 和 polyfill
        filename: '[name].dll.js',
        // 输出文件多放在 dist 目录下
        path: distPath,
        // 存放动态链接库的全局变量名称，理由对应 react 来说就是 _dll_react
        // 加_dll 防止全局变量命名冲突
        library: '_dll_[name]',
    },
    plugins:[
        // 接入 DllPlugin 
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致，
            // 该字段的值也就是输出的 manifest.json 文件中的 name 字段的值
            // 如 react.manifest.json 中就有 'name' : '_dll_react'
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(distPath, '[name].manifest.json'),
        })
    ],

}

{
    test: '/\.(png|jpg|jpeg|gif)$/',
    use : {
        loader: 'url-;oader',
        options:{
            // 小于 5KB 的图片用 base64格式输出
            // 否则依然用file-loader的形式产出url格式
            limit: 5*1024,
            // 打包到 img目录下
            outputPath: '/img1/',
            // 设置图片的cdn
        }
    }
}

const ModuleConcatenactionPlugin = require('webpack/lib/optimize/ModuleConcatenactionPlugin');

module.exports = {

    // 针对 npm 中的模块优先采用 jsnext:main 中指向 es6 模块化语法的文件
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main'],
    },
    plugins:[
        new ModuleConcatenactionPlugin(),
    ]
}