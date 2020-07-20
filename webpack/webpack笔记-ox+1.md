

#### DllPlugin 动态链接插件库

---

##### background

- 前端框架如 Vue React 等，体积大，构建慢
- 较稳定，不经常升级版本
- 同一个版本只构件一次即可，不用每次都重新更新

---

##### 使用方法

- webpack 内置了 DllPlugin 支持。
- DllPlugin 打包出 dll 文件
- DllReferencePlugin 使用 dll 文件

---

##### 代码演示

- 在 build 文件夹下 新建 一个 webpack.dll.js 存放 dllplugin 相关的 配置

```js
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
```

- 在 package.json 中 scripts 下写入 命令 

```js
'dll' : 'webpack --config build/webpack.dll.js'
```

- npm run dll 得到 react.dll.js 以及 react.manifest.json
- 使用方式， index.html 中通过 script 引用 react.dll.js
- 在 webpack.dev.js 中引入 DllReferencePlugin ，在plugins 增加

```js
new DllReferencePlugin({
    manifest: require(path.join(distPath, 'react.manifest.json'));
})
```



---

