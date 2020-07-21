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





