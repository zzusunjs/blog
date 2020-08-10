---
title: Vue 面试题总结
---



#### Vue 面试真题演练





##### v-show 和 v-if  的区别 ？

- v-show 通过 css display 控制显示和隐藏。
- v-if 组件真正的渲染和销毁，而不是显示和隐藏。
- 频繁切换显示状态使用 v-show 否则 v-if 。



##### 为何在 v-if 中使用 key ？

- 必须是 key ,且不能是 index 或者 random
- diff 算法通过 tag 和 key 来判断是不是 sameNode
- 减少渲染次数，提升渲染性能



##### 描述 Vue 组件的生命周期（包含父子组件的情况）?

##### Vue 组件如何通讯 （常见的通讯方式）？

- 父子组件，props 和 this.$emit
- 自定义事件 event.$on $event.$off event.$emit
- vuex

##### 描述组件渲染和更新的过程 ？

<img src="./pics/renderAndUpdate.png" width="600">



##### 双向数据绑定 v-model 的实现原理 ？

- 举例来说，input  的 元素 value = this.name
- 绑定 input 事件, this.name = $event.target.value (从 vue-template-compiler 编译出的代码来看) 
- data 更新触发 re-render 



##### 对 MVVM 的理解 ？



##### computed 的特点 ？

- 缓存
- 提高性能

##### 为何组件的 data 必须是一个函数 ？

-  组件重用。data 是一个函数才能保证实例化出的组件各自拥有不同的数据。

##### ajax 请求应该放在哪个生命周期 ？

- mounted
- js是单线程的，ajax 异步获取数据
- 放在 mounted 之前没有用，dom 还没有。

##### 如何将组件所有 props 传递给 子组件 ？

- $props
- `<User v-bind="$props" />`

##### 如何自己实现 v-model ?

##### 多个组件的相同逻辑，如何抽离 ？

- mixin
- mixin 的缺点

##### 何时使用异步组件 ？

- 加载大组件
- 异步路由加载



##### 何时使用 keep-alive ？

- 缓存组件，不需要重复渲染
- 如多个静态的 tab 页的切换
- 优化性能

##### 何时需要使用 beforeDestroy

- 解除自定义事件 event.$off
- 清除定时器 
- 解绑自定义 DOM 事件，如 window scroll 等

##### 什么是作用域插槽

##### Vuex 中 action 和 mutation 的区别 ？

- action 可以处理异步，mutation 不可以
- mutation 做原子操作
- action 可以整合多个 mutation 



##### Vue-router 常用的路由模式 ？

##### 如何配置 Vue-router 异步加载 ？

- `component: ()=> import()`



##### 用 vnode 描述一个 DOM 结构 ？

##### 监听 data 变化的核心 API 是什么 ？

##### Vue 如何监听数组变化 ？

- 重新定义原型，重写 push pop 等方法，实现监听。
- proxy 可以原生支持监听数组变化。

##### 响应式原理 ？

- 监听 data 变化
- 组件渲染和更新的流程

##### diff 算法的事件复杂度 ？

##### 简述 diff 算法过程 ？

- patch(elem, vnode) 和 patch(vnode, newVnode)
- patchVnode 和 addVnodes 以及 removeVnodes
- updateChildren (key 的重要性)

##### Vue 为何是异步渲染，$nextTick 有何用 ？

- 异步渲染（以及合并 data 修改）以提高性能
- $nextTick 在 DOM 更新完之后，触发回调

##### Vue 常见性能优化

- 合理使用 v-show 和 v-if
- 合理使用 computed
- v-for 时加 key，以及避免和 v-if 同时使用
- 自定义事件，DOM 事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深，（深度监听不易）
- vue-loader 在开发环境下编译 template
- webpack 层级的有阿虎
- 前端通用的性能优化，如 图片懒加载
- 使用 SSR 







##### Vue3

- 全部用 ts 重写，（响应式，vdom，模板编译）

- 性能提升，代码量减少（打包结果）。

- 调整部分 API

- Proxy 实现响应式

  - 回顾 Object.defineProperty 的缺点

    - 深度监听需要一次性递归
    - 无法监听新增属性、删除属性（Vue.set Vue.delete）
    - 无法原生监听数组，需要特殊处理

  - 基本使用

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>proxy</title>
    </head>
    
    <body>
        <script>
            // proxy 基本使用
    
            const data = {
                name: 'zhangsan',
                age: 24,
                nums: [1, 2, 3]
            }
    
            const array = [1,2,3];
            // proxyData.push(100)
    
            const proxyData = new Proxy(array, {
                get(target, key, receiver) {
                    // target: 原生的data 
                    // key : key
                    // reveiver : 其实是 proxyData
    
                    // Reflect.ownKeys([1,2,3]) ==> ["0", "1", "2", "length"]
                    // Reflect.ownKeys({a: 10, b: 20}) ==> ["a", "b"]
    
                    // 只处理非原型的属性
                    const ownKeys = Reflect.ownKeys(target);
                    if(ownKeys.includes(key)){
                        console.log('get', key);
                        // 监听
                    }
                    const result = Reflect.get(target, key, receiver);
                    
                    return result;
                    // 返回get 结果
                },
    
                set(target, key, val, receiver) {
    
                    // 重复修改不处理
                    const oldValue = target[key];
                    if(val === oldValue){
                        return true;
                    }
                    const result = Reflect.set(target, key, val, receiver)
                    console.log('set', key, val);
                    console.log("set result ", result);
                    // 返回设置成功的意义在于有些对象可以被 defineProperty 为 不可修改的
                    return result;
                    // 是否设置成功
                },
    
                deleteProperty(target, key) {
                    const result = Reflect.deleteProperty(target, key);
                    console.log("delete property ", key);
                    console.log("delete result ", result);
                    return result;
                    // 是否删除成功
                }
            });
            // 可以监听数组变化  通过下标的赋值呢 无法监听，但可以监听到 get 的动作？
            // 可以监听属性新增和删除
            // delete proxyData.age 删除的用法
        </script>
    </body>
    </html>
    ```

  - Reflect

    - 和 Proxy 能力一一对应

    - 规范化，标准化，函数式

      ```js
      const obj = {name: 'RUOK', age: '20'};
      console.log('name' in obj)  
      // 判断属性是否存在
      console.log(Reflect.has(obj, 'name'))
      // 第二种写法，函数的形式，好查好写
      
      
      delete obj.age
      Reflect.deleteProperty(obj, 'age');
      ```

    - 代替掉 Object 的工具函数

      ```js
      const obj = {name: 'RUOK', age: '20'};
      Object.getOwnPropertyNames(obj); 
      //  ["name", "age"]
      Reflect.ownKeys(obj);
      
      ```

  - 实现响应式

    - 深度监听，性能更好
    - 可监听 新增、删除 属性
    - 可监听数组变化
    - 无法兼容所有浏览器，而且无法 polyfill 

    ```js
    function reactive(target = {}) {
    
        if (typeof target !== 'object' || target == null) {
            // 不是对象或者数组，直接返回
            return target;
        }
    
        // 代理配置
        const proxyConf = {
    
            get(target, key, receiver) {
                // target: 原生的data 
                // key : key
                // reveiver : 其实是 proxyData
                // Reflect.ownKeys([1,2,3]) ==> ["0", "1", "2", "length"]
                // Reflect.ownKeys({a: 10, b: 20}) ==> ["a", "b"]
    
                // 只处理非原型的属性
                const ownKeys = Reflect.ownKeys(target);
                if (ownKeys.includes(key)) {
                    console.log('get', key);
                    // 监听
                }
                const result = Reflect.get(target, key, receiver);
    
                return reactive(result);
                // 深度监听
                // 性能提升在于 只有要 get info 的时候 才会触发 更深层级的监听
                // 返回get 结果
            },
    
            set(target, key, val, receiver) {
    
                // 重复修改不处理
                const oldValue = target[key];
                if (val === oldValue) {
                    return true;
                }
    
                // 监听新增的属性
                const ownKeys = Reflect.ownKeys(target);
                if(!ownKeys.includes(key)){
                    console.log("new property ", key);
                }
    
                
                const result = Reflect.set(target, key, val, receiver)
                console.log('set', key, val);
                console.log("set result ", result);
                // 返回设置成功的意义在于有些对象可以被 defineProperty 为 不可修改的
                return result;
                // 是否设置成功
            },
    
            deleteProperty(target, key) {
                const result = Reflect.deleteProperty(target, key);
                console.log("delete property ", key);
                console.log("delete result ", result);
                return result;
                // 是否删除成功
            }
    
        }
    
        // 生成代理对象
        const observed = new Proxy(target, proxyConf);
        return observed;
    }
    
    // 测试数据
    const data = {
        name: 'zhangsan',
        age: 20,
        info: {
            city: 'BJ',
            a: {
                b:{
                    c:{
                        d: 'RUOK'
                    }
                }
            }
        }
    }
    
    const proxyData = reactive(data);
    ```

    



