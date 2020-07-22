const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules:[
            {
                test: /\.jsx?/, // js and jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        // 不必寻找 babelrc 配置文件了，就是么有
                        presets:[
                            require.resolve('@babel/preset-react'),
                            require.resolve('@babel/preset-env', {module:false})
                        ],
                        // module:false 不必解析 import 语句，这是 commonJS 所支持的 ？？
                        cacheDirectory: true,
                        // 编译结果放入缓存，提高效率
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, 'src/index.html'),
                // 被处理文件的零
                filename: 'index.html'
            }
        )
    ],
    resolve:{
        extensions: ['.js', '.jsx', '.json'],
        // 这些文件在被引入的时候就不用写后缀了，webpack 会在没有后缀名的时候遍历添加后缀然后寻找
    },
    entry: path.resolve(__dirname, 'src/index.jsx'),
    
}