const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(__dirname, "__dirname");

module.exports = {
    entry: path.join(__dirname, "\\src\\index.js"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                include: /src/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        })
    ],
    mode: 'production',
    devServer:{
        quiet: true,
    }
}