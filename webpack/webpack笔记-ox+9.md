

#### 面试题

---

##### 1. 前端为何要进行打包和构建 ？

（要点，然后结合自身的经验。回答有对，而且突出自己的经验。）

- 代码方面，写代码和产出代码。

  - 体积更小（tree-shaking，压缩，合并，）加载更快
  - 编译高级语言或语法 （es6, ts, 模块化，scss）
  - 兼容性和错误提示 （Polyfill, postcss, eslint）

- 研发流程方面

  - 统一，高效的开发环境
  - 统一的构建流程和产出标准
  - 集成公司的构建规范（提测，上线等）

  

##### 2. Module Chunk bundle 的区别

-  module - 各个源码文件，webpack 中一切皆模块
- chunk - 多模块合成， 如 entry import splitChunk
- bundle - 最终的产出文件



##### 3. loader 和 plugin 的区别

- loader 模块转换器， 如 less 到 css
- plugin 扩展插件， 如 HtmlWebpackPlugin 将 js / css 塞入到 HTML 文件中



##### 4. 常见的 loader 和 plugin 有哪些 ？

- https://www/webpackjs.com/loaders/
- https://www/webpackjs.com/plugins/
- 常见的即可，讲过的即可



##### 5. babel 和 webpack 的区别 ？

- babel - JS 新语法的编译该工具，不关心模块化
- webpack - 打包构建工具， 是多个 loader plugin 集合



##### 6. 如何产出一个 lib

- webpack 中配置

```js
output:{
    //lib 文件名
    filename : 'laodsh.js',
    // 输出 lib 到 dist 目录下
    path: distPath,
    // lib 的全局变量名
    library: 'loadsh',
}
```



##### 7.babel-polyfill 和 babel-runtime 的区别

-   babel-polyfill 会污染全局，babel-runtime 则不会
- 产出第三方 lib 的时候务必使用 babel-runtime 



##### 8. webpack 如何使用懒加载

- import 语法
- 结合 Vue  react 异步组件
- 结合 vue-router react-router 的异步加载路由



##### 9. 为何 Proxy 不能被 Polyfill

es6 中有些语法可以使用 es5 等模拟，有些则不能。比如说：

- Class 可以用 function 模拟
- Promise 可以用 callback 模拟
- Proxy 无法使用 Object.defineProperty 模拟，而且也没有其他方式



##### 10. webpack 优化构建速度 （可用于生产环境）

- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin



- 自动刷新
- 热更新
- DllPlugin 



##### 11. webpack 优化产出代码

- 小图片 base64 编码
- bundle 加 hash 
- 懒加载
- 提取公共代码
- 使用 CDN 加速 
- IgnorePlugin
- 使用 production
- Scope Hosting



