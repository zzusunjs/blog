const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    // 工程资源入口, 可以是一个文件或多个文件
    output: {
        path : path.join(__dirname, 'dist'),
        // 必须是绝对路径
        filename: 'bundle.js',
        // 打包结果文件名
    },
    // 入口为 app.js  出口为 bundle.js 的配置
    devServer:{
        port: 8082,  // 指定服务端口
        publicPath: '/dist' // 资源路径
        // webpack-dev-server 运行时不会真的在dist目录下打包出结果，bundle.js存在于内存中
    },
    module:{
        rules:[
            {
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader',
                ]
                // 对应正则表达式，规定了哪种文件需要被处理
                // 正则表达式不用加引号，又不是字符串
                // css-loader 仅仅解析样式，不能加载样式
                // style-loader 将样式用一个 style 标签插入到 HTML中
                // 二者配置的顺序也十分重要，必须先解析后插入，而loader 的配置顺序和加载顺序征相反
                // loader 本质上就是文件加载器，实现文件的转义
            }
        ]
    },
    plugins:[
        new UglifyJsPlugin()
    ]
}