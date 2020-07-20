

#### Scope Hosting



---

##### background

```js
// hello.js
export default 'Hello Alice';

// main.js
import str from './hello.js';
console.log(str);
```

​		

​		上述两个文件会被打包成两个函数，对应两个函数作用域。在实际的开发中，不开启 Scope Hosting 的情况下，多个文件被打包为多个函数，对应多个函数作用域，对 内存的使用较高，执行效率不高。如果能将这些函数合并，比如所将 上面两个文件的代码整合为一个等效的函数就能够减少函数作用域，增加代码执行效率。



- 代码体积更小
- 创建函数作用域更少
- 代码可读性更好

---

##### 使用方法

- 加载插件
- 使用插件

```js
module.exports = {

    // 针对 npm 中的模块优先采用 jsnext:main 中指向 es6 模块化语法的文件
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main'],
    },
    plugins:[
        new ModuleConcatenactionPlugin(),
    ]
}
```

