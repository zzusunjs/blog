#### Webpack

---



##### background



- webpack 是什么 ？

  一个现代 JavaScript 应用程序静态模块打包器。(默认情况下只能处理 JavaScript，打包意味着将多个 js 文件整合为一个文件，避免了处理文件之间的依赖关系和加载顺序。[a, b , c] => [bundle.js]。)

  - 为什么要打包 ？

    逻辑多，文件多，项目的复杂度提高了。

  <img src="./pics/webpack介绍.bmp">

- webpack 的其他功能

  - loader ， “翻译器”， 处理 es6，less， sass 等  （通过 loader  处理）
  - plugin ,  "小动作"
  - loader , plugin 都是可插拔的，根据需要灵活配置。

  

---

##### 安排

- Root
  - 课程介绍
    - webpack介绍
    - 学习建议
  - webpack  的原理和背景
    - 前端模块化
    - 模块化方案历史方案
    - webpack  打包思路
  - 实战
    - 配置开发环境
    - webpack 构建工程
    - webpack 核心特征
    - loader 和 plugin
  - webpack 与前端性能
    - webpack  性能调优
  - 总结
    - webpack 不止于 “pack”



##### 课程目标

- 理解前端模块化
- 理解webpack 打包的核心思路
- 理解 webpack 中的关键概念  （loader, plugin）



---

##### 理解前端模块化

（作用域 =》 命名空间 =》 模块化）

```html
<body>
    <script scr="./a.js"></script>
    <script scr="./b.js"></script>
    <script scr="./b.js"></script>
<body>
```

三个 js 文件的全局作用域其实是同一个，如果需要使用全局作用域（windows），很容易造成命名冲突。

一种解决方案就是将 全局变量 降级为一个与文件名同名的对象属性。使用的时候指出是哪个文件的变量即可，相当于添加了一层命名空间，只要文件名不重复，就可以缓解命名冲突。

但这样还有另外一个问题，对象的属性都暴露在全局作用域下。很多时候，我们只希望暴露出一些方法而不是变量本身（就像面向对象语言中的封装一样）。

一种解决方案就是 闭包，通过函数作用域封装。通过函数作用域保护一些变量，暴露出特定的方法，变量。所以也有人把函数作用域称为模块作用域。

```js
var SusanModule = (function(){
    var name = "Susan";
    var gender = "female";
    return {
        tell : function(){
            console.log("me ", this.name);
            console.log("gender ", this.gender);
        }
    }
})()
// 立即执行的函数 

(function(window){
    var name = "Susan";
    var gender = "female";
    function tell(){
        console.log("me ", this.name);
        console.log("gender ", this.gender);
    }
    window.SusanModule = {tell}
    // 将变量绑定到全局的代码移动到内部
})(window)

```



##### 模块化的优点： 

- 作用域封装
- 代码重用
- 解除耦合



----



##### 模块化方案演化历史

- AMD

  - asynchronous module definition (异步模块定义)

    ```js
    define('getSum', ['math'], function(math){
        return function(a, b){
            console.log("sum: " + math.sum(a, b));
        }
    });
    // 求和模块
    // 在amd中 使用 define 定义模块, 传入参数为 模块id, 依赖模块，函数（返回值为导出）或对象（导出值）
    //强调模块的依赖必须显示引入，不需考虑引入顺序
    ```

- COMMONJS

  - 2009年提出，最初用在 nodejs

    ```js
    // 通过 require 函数导入
    const math = require('./math');
    
    // 通过 exports 导出
    exports.getSum = function(a, b){
        return a + b;
    }
    //强调模块的依赖必须显示引入，不需考虑引入顺序
    ```

    

- ES6 Module

  - 与 COMMONJS 有些相似

    ```js
    // import 导入
    import math from './math';
    
    // export 导出
    export function sum(a, b){
        return a + b;
    }
    ```

  - es6 在语法层面支持了模块化，在es6 之前还有许多别的构建工具，如 gulp, grunt。二者其实是自动化构建，除了打包还有一些别的工作也做，而webpack 则专注于 打包。

----

##### webpack 的打包机制

- 学习目标
  - webpack 与 立即执行函数的关系
  - webpack 打包的核心逻辑

- webpack 打包后的结果分析

  - 大体结构

    ```js
    (function(modules)){
         var installedModules = {};
    
    	 function __webpack_require__(moduleId){
             // 函数定义
         }
    	 return __webpack_require__(0);
         // entry file
     })([/* modules array */]);
    ```

  - 核心方法

    ```js
    function __webpack_require__(moduleId){
        // checkout if module is in cache
        if(installedModules(moduleId)){
            return installedModules[moduleId].exports;
        }
        // create a new module and put it into the cache
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        // execute the module function
        modules[moduleId].call(
            module.exports,
            module,
            __webpack_require__
        );
        // flag the module as loaded
        module.l = true;
        // return the exports of the module
        return module.exports;
    }
    ```

- webpack 的打包过程

  - 从入口文件开始，分析整个文件的依赖树
  - 将每个依赖模块包装起来，放到一个数组中等待调用
  - 实现模块加载方法，并把它放到模块执行的环境中，确保模块之间可以互相调用
  - 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数。

 

---

##### 配置开发环境 --- npm 与包管理器

- 理解包管理器
- 熟悉 npm 核心特性
- 理解 npm 仓库 与 依赖 的概念
- 理解 npm  语义化版本
- 掌握 使用 npm 自定义工程脚本的方法



 		包管理器是一个可以让开发者便捷的获取代码和分发代码的工具。 npm 依赖于nodejs 环境，需要安装 nodejs 才可以使用，npm 会随着 nodejs 一起安装。

```js
// npm 的一些命令
npm init 
// 初始化项目
npm config set registry https://registry.npm.taobao.org
// 设置npm 镜像
npm install loadash --save
// 将下载下来的包 写入到 package.json 的 dependencies 中
// npm5 之后 --save 已经是默认参数了，不写也可以达到同样效果
npm install loadash --save-dev 
// --save-dev 是一个参数 指定当前环境是开发环境,把 包的信息记录在 devDependencies 中
// npm 中的依赖主要分为 dependencies 是生产环境中， devDependencies 是开发环境
// npm install --only=dev 仅仅安装 开发环境中的包
// npm install --only=prod 仅仅安装 开发环境中的包 （加快总体安装速度）
// npm install 默认只安装dependencies中的包，所有与功能相关的依赖都应当安装到此
// devDependencies 一般放置一些构建工具，开发工具之类的，如 eslint 
```

package.json

```js
{
    "name": 'demo', 
    // 包名称，下载 引用的依据
    "version": "1.0.0"   // 语义化版本号
    "description":"",
    "main":"index.js",  // 执行入口
    "scripts":{
        "test": 'echo \"error: no test specificed\" && exit 1'
        //自定义脚本, 实现开发和构建中的自动化命令。
    },
    "author":"",
    "liscense": 'ISC'
}
```



版本号

```js
"jQuery" : "^3.4.1"
// ^Version: 中版本和小版本。如^3.4.1 中版本号为4，小版本号为1，意思是 所有3.x.x中最新版本
// ~Version: 小版本 如~3.4.1 意思是 所有 3.4.x中最新版本
// version : 特定版本
// 便于轻松获取指定范围内的最新版本，小版本容易推送到用户
```



Scripts 

脚本命令可以分为两类，一类为 npm 在包的发布，安装的生命过程中为开发者预留的钩子，如 `preinstall postinstall  prepublish postpublish` ，这些对于包的开发者较为常用。另一类为 自定义命令，为包的使用者常用，可以自定义命令名称和要执行的脚本。

```js
"scripts":{
    "dev" : "webpack-dev-server",
     // npm run dev 启动dev 服务器
    "build": "eslint ./src && webpack"
    // npm run build 对代码格式做校验，然后打包
}
```



npm install 的过程

- 寻找包版本信息文件（package.json） ，依照它来进行安装
- 查 package.json 中的依赖，并检查项目中其他的版本信息文件
- 如果发现了新包，就更新版本信息文件

----



##### webpack 核心特性

- 使用 webpack 构建简单的工程
- 了解 webpack 配置文件
- 掌握 “一切皆模块与loader 的思想”
- 理解 webpack 中的 “关键人物”，入口文件，出口文件，loaders, plugin, webpack-dev-server



```js
// webpack 命令介绍
webpack // 打包
webpack-dev-server // 启动 webpack-dev-server 可以监听文件目录变化  
// webpack-dev-server 运行时不会真的在dist目录下打包出结果，bundle.js存在于内存中
```



​       plugin 用于增强webpack 能力，和 loader 的区别在于，plugin 拥有事件监听能力，改变一些文件打包后的输出结果。让页面渲染的更快一些，对资源进行压缩处理，如去除注释，换行，空格等。如 `uglifyjs-webpack-plugin`



---



##### webpack 构建工程

- 使用webpack 构建一个真实的 react 工程
- 掌握 babel 的用法，理解babel 原理
- 掌握 高频 loader 和 plugin 的用法
- 掌握生产级别的 webpack 配置方法



---



- - webpack 读不懂 es6 代码 ？ 

    babel 代码编译，es6 转成 es5 。

    ```js
    npm install @babel/core @babel/cli -g
    
    babel xx.js // 编译指定的 es6 js 文件，结果并没有发生转换
    
    babel test.js --presets=@bable/preset-env
    // 指定转换规则
    
    //@babel/preset-env 转换规则，将高版本的es 代码转换成低版本的
    ```

    babel 也可以有配置文件，而且还有两种方式。

    - 在 package.json 中配置 “babel” 字段
    - 在 .babelrc 文件中写 键值对 （还是 JSON格式），优先加载 .bablerc 中的配置

  - html 只是在特定时间节点被处理，plugin 处理即可

    html-webpack-plugin

  - webpack-dev-server 

    ```js
    webpack-dev-server --open // 启动服务并打开浏览器
    webpack-dev-server --config webpck.config.dev-js // 指定按照配置启动
    // webpack-dev-server 带参数命令过长的话可以 在package.json 中自定义命令
    ```

    - 配置热更新 HMR 
    
      ? ? 待解决，如何验证已经启用了 HMR 

----



##### webpack 性能调优

- 打包结果优化 （空间维度，体积尽量小）
- 构建过程优化（时间维度，速度尽可能快）
- Tree-Shaking



介绍插件

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 通过树图的形式可视化 打包结果中各个文件的大小
```

<img src="./pics/webpackBundleAnalyzer.bmp" width="600px">





构建速度和打包结果的优化很多时候是耦合在一起的。优化构建的思路，什么在耗时。

1. 一些大型模块不去解析算了。
2. 减少查找。（减少干活的量）
3. （增加干活的人，多线程 HappyPack，thread-loader (webpack.config.js 中摆在所有loader之前)，简单项目不要，反而多线程会减慢速度）
4. 预编译 ， 动态链接库



webpack  自身的优化思想 tree-shaking (本质上消除无用的 js  代码)

dec 即 无用代码消除，在编译器中早有实现， 而 tree-shaking 可以看做 dce 的 一种实现方式。实验还需要再去做。



---



##### webpack  不止于 pack

- 前端发展的产物
- 模块化打包方案
- 工程化方案