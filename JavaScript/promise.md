---
title : Promise 与 async
---

### Promise 

Promise 是 JavaScript 语言提供的一种标准化的异步管理方式，它的总体思想是，需要进行 io、等待或者其它异步操作的函数，不返回真实结果，而返回一个“承诺”，函数的调用方可以在合适的时机，选择等待这个承诺兑现（通过 Promise 的 then 方法的回调）。

```js
    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve,duration);
        })
    }
    sleep(1000).then( ()=> console.log("finished"));
```

这段代码定义了一个函数 sleep，它的作用是等候传入参数指定的时长。

promise 中的代码属于 宏观任务中的微观任务，在每个宏观任务中，总是先执行完微观任务，再执行宏观任务。我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。许多的微观任务的队列组成了宏观任务。

---

### async 以及 await

async/await 是 ES2016 新加入的特性，它提供了用 for、if 等代码结构来编写异步的方式。它的运行时基础是 Promise，面对这种比较新的特性，我们先来看一下基本用法。async 函数必定返回 Promise，我们把所有返回 Promise 的函数都可以认为是异步函数。async 函数是一种特殊语法，特征是在 function 关键字之前加上 async 关键字，这样，就定义了一个 async 函数，我们可以在其中使用 await 来等待一个 Promise。

一个红绿灯的例子（我们现在要实现一个红绿灯，把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色）可以用 promise  和 按 async await 的方式改写如下

```js
	  var sleep = function (duration) {
            return new Promise(function (resolve, reject) {
                setTimeout(resolve, duration);
            });
        }

        async function change(duration, color) {
            document.getElementById('trafficLight').style.background = color;
            await sleep(duration);
        }

        async function main() {
            console.log("in main");
            while (true) {
                await change(3000, 'green');
                await change(1000, 'yellow');
                await change(2000, 'red');
            }
        }
        main();
```

---

参考文献

- [极客时间-重学前端]( https://time.geekbang.org/column/article/82764 )
- [promise]( https://github.com/mqyqingfeng/Blog/issues/98 )
- 