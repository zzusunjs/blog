const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
// UglifyJS 压缩 es5 很棒, 对 es6不太行
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack')
//const happyThreadPool = HappyPack.ThreadPool({size:OscillatorNode.cpus().length});
// 根据 cpu 数量创建线程池
// HappyPack 多进程
// ThreadLoader 

// webpack-bundle-analyzer 树图分析打包结果中各个文件的大小，便于分析优化
module.exports = {
    // optimization:{
    //     minimizer: [
    //         new TerserPlugin(
    //             {
    //                 cache: true,
    //                 //使用缓存, 加快构建速度
    //                 parallel: true,
    //                 // 开启多线程
    //                 terserOptions:{
    //                     compress:{
    //                         unused: true,
    //                         drop_debugger: true,
    //                         drop_console: true,
    //                         // 删除无用代码，删除 debugger 删除 console
    //                         dead_code: true,
    //                     }
    //                 }
    //             }
    //         )
    //     ]
    // },
    module: {
        // noParse: /node_modules\/(jquery\.js)/,
        // 不解析 jquery , jquery 中不包含 import 等模块化语句
        rules:[
            // {
            //     test: /\.js$/,
            //     include: path.resolve('src'),
            //     use:[
            //         'thread-loader',
            //     ]
            // },
            {
                test: /\.jsx?/, // js and jsx
                exclude: /node_modules/,
                include: /src/, 
                // 只要这部分, 优先级 exclude > include > test
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
        ),
        //new webpack.HotModuleReplacementPlugin(),
        // 热更新需要的插件，还需要在相应的文件中添加代码
        //new BundleAnalyzerPlugin(),
        // new HappyPack({
        //     id: 'jsx',
        //     threads: happyThreadPool,
        //     loaders: ['babel-lodaer'],
        // })
        // 给loader 配置 happyPack 需要提前知道 该loader 是不是支持 happypack
        // url-loader, file-loader 都不支持哦
    ],
    resolve:{
        extensions: ['.js', '.jsx', '.json'],
        // 这些文件在被引入的时候就不用写后缀了，webpack 会在没有后缀名的时候遍历添加后缀然后寻找
    },
    entry: path.resolve(__dirname, 'src/index.jsx'),
    devServer:{
        hot: true
    }
    // 配置热更新
    
}