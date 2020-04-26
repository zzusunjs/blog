----
**题意描述：**      给出以下代码的运行结果。

---

**输入：**

```javascript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

---
**输出：**

```c
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```
----
**解题思路：**

Alice : 这道题你做错了呀，来说说你是怎么想的吧。
Bob: 我知道 JavaScript 中的事件有 **微任务** 和 **宏任务** 之分， 每个**宏任务**内部，总是微任务先执行，然后才执行这个宏任务。
Alice: 你的意思是 每个 宏任务 “绑定” 了一些微任务，在这些微任务执行完之后才会执行这个宏任务 ？
Bob: 对，但是我不知道 微任务与微任务之间，宏任务与宏任务之间的 执行顺序该怎么确定。
Alice; 这个就说来话长了，我慢慢讲给你听，可以先告诉你，你理解的宏任务和微任务的执行顺序是不对的，一个宏任务可能有若干个微任务，在宏任务执行结束之后才会去执行这些微任务。这道题考察的知识点还是挺多的，只知道微任务和宏任务肯定是答不出来的，你看里面 又有 `async await` 又有 `setTimeout` 又有 `Promise`，只有对 JavaScript 的 **事件循环** 掌握了才能答得出来。
Bob: 那你快说呀，我洗耳恭听。
Alice: 那就先从 **任务队列**说起吧。1）JavaScript 中的任务分为 **同步任务** 和 **异步任务**，2） 同步任务都在主线程上执行，形成一个执行栈，3）主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列中放置一个事件，4）一旦执行栈中的所有同步任务执行完毕（此时 JavaScript 引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中执行。而根据规范，事件循环是通过任务队列的机制来进行协调的。
Bob: 事件循环是通过任务队列的机制实现的，这是 how 的问题，还有 why 的问题呢， 为什么要有事件循环呢 ？
Alice: 是这样的，JavaScript 是一个单线程的语言，也就是 从上到下 一行一行的执行代码。但是这样就有一个问题，如果遇到了某行 耗时很久的代码就会一直 阻塞 在那，后面的代码就无法执行了。比如说，下载一张图片，发送一个 ajax 请求等等。在等待 图片下载完成之前，ajax 请求成功之前，其实并没有事情可做，与其这样等着，还不如继续执行后面的代码。这就有了另一个问题，继续执行后面的代码之后，图片下载完成之后对图片的操作 该什么时候执行呢，怎么实现呢 ？
Bob: 你是说JavaScript 中的 ajax 请求，下载图片之类的代码可以看做是 异步任务，而其他顺序执行的是 同步任务。异步任务中的代码并不是立即执行的，而是依靠着事件循环 （有任务队列实现的）来执行的。
Alice: 是的，维基百科中是这样描述事件循环的： "Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"

<img src="https://img-blog.csdnimg.cn/2020042615525668.png" align="center" width="400">

上图主线程的绿色部分，表示运行时间，橙色部分表示空闲时间。每当遇到I/O的时候，主线程就让Event Loop线程去通知相应的I/O程序，然后接着往后运行，所以不存在等待时间。等到I/O程序完成操作，Event Loop线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。

<img src="https://img-blog.csdnimg.cn/20200426155633250.png" width="400" align="center">

虚线框住的是 JS 引擎，然后 stack 就是执行栈，执行栈中的代码在运行过程中产生的 异步操作会在 操作完成后在 任务队列中注册回调函数。当执行栈为空的时候，会从任务队列中 取出队头的回调函数 放入执行栈中执行，如此循环往复，是为事件循环。

<img src="https://img-blog.csdnimg.cn/20200426155808863.png" align="center" width="500" >

用流程图的方式描述事件循环。

Bob: 看完这几张图，大体上能够理解事件循环了。事件循环是 JavaScript 中处理异步代码的方式，正是有了 事件循环 JavaScript 才是 非阻塞（Non-blocking）的。事件循环的具体实现就是，当主线程遇到异步代码的时候，将异步代码交给 消息线程 去处理，消息线程会在异步操作结束后，向事件队列（任务队列）中添加回调函数，当主线程的执行栈为空的是，再从事件队列中取出队头的回调函数放入 执行栈中执行。而事件循环所指的就是这个，循环往复的过程。
Alice: 😉你总结的很不错嘛，What, Why, How 都有了。
Bob:  然后呢，微任务和宏任务在任务队列中是怎么样的 ？微任务和微任务之间，宏任务和宏任务之间，微任务和宏任务之间的关系呢 ？
Alice: 还有一张图很不错，先看这个。

<img src="https://img-blog.csdnimg.cn/20200426162418175.png" align="center" width="500">

图里面 Task Queue 可以看出是任务队列（宏任务）（事件队列）Microtask Queue 就是微观队列，看到了吧，一个宏任务对应着一个微任务队列。

<img src="https://img-blog.csdnimg.cn/20200426162622694.png" width="500" align="center">

这张图也是这个意思，一个宏任务对应着若干个微任务组成的微任务队列。
Bob: 额，微任务之间的执行顺序是按照 微任务队列中的顺序 从队头到队尾 ？ 宏任务之间的执行顺序就是按照 任务队列 中的顺序 从 队头到队尾是吗 ？
Alice 是的，宏任务主要有：`script`(整体代码)、`setTimeout`、`setInterval`、`I/O`、`UI交互事件`、`postMessage`、`MessageChannel`、`setImmediate`(Node.js 环境）
微任务主要包含：`Promise.then`、`MutaionObserver`（与DOM有关）、`process.nextTick`(Node.js 环境)。
然后运行的机制大概是这样的：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

<img src="https://img-blog.csdnimg.cn/20200426174422630.png" width="400" align="center">


Bob: 那 await 呢，await 后面的代码算宏任务还是微任务呀 ？
Alice: 从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。
Bob：await 这样子好像还是回调函数那一套呀，只不过是同步代码的写法。
Alice: 对啊，现在我们就可以 重新分析一下上面那道题了。
```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```
在这一段代码中首先定义了两个 async 函数 async1, async2, 然后执行了 `console.log('script start')`,所以控制台肯定是 {script start}。然后接着往下走，遇到一个 setTimeout ，放到任务队列中【setTimeout1, 】。然后执行了 `async1()` async1 是一个函数，执行第一行 输出 `'async1 start'`此时控制台是{script start， async1 start, } 然后第二行 有 await ，await 会把 async2 执行了，输出async2，此时控制台是{script start， async1 start, async2} 然后把  `console.log('async1 end');`放入微任务队列【async1 end,】。这样 async1 就执行完了。接着往下后， Promise 中的代码立即执行，输出 promise1, 此时控制台是{script start， async1 start, async2, promise1}。然后 then 里面的代码被放到 微任务队列中 【async1 end, promise2】,然后执行最后一句，控制台中变成 {script start， async1 start, async2, promise1，script end,}。到现在 任务队列中有 【setTimeout】微任务队列中有 【async1 end, promise2】 。然后依次执行微任务对应的代码，控制台中的输出应该变成{script start， async1 start, async2, promise1，script end, async1 end, promise2}。然后这个宏任务就结束了，开始下一个宏任务，输出 setTimeout 就结束了。最终的结果就是{script start， async1 start, async2, promise1，script end, async1 end, promise2， setTimeout}
Bob: 醍醐灌顶，恍然大悟呀。
Alice: JavaScript 中的事件循环大概就是这样了，不过上面的描述中还有很多不规范的地方，以后再来完善吧。
Bob:I'll be the roundabout...

<img src="https://img-blog.csdnimg.cn/20200426165925421.png" align="center">



---

**易错点：**

```js
script start
async1 start
async2          // 误认为await 会阻塞 后面的代码
async1 end
setTimeOut      //  不知道script 本身就是一个宏任务
promise1     
promise2        //  不知道 then 中的代码会被添加到微任务
script end
```

---

**总结：**

举一反三，再来点训练吧。
```js
Promise.resolve().then(function promise1 () {
       console.log('promise1');
    })
setTimeout(function setTimeout1 (){
    console.log('setTimeout1')
    Promise.resolve().then(function  promise2 () {
       console.log('promise2');
    })
}, 0)

setTimeout(function setTimeout2 (){
   console.log('setTimeout2')
}, 0)
// 执行结果 promise1 setTimeout1 promise2 setTimeout2
```
```js
setTimeout(function () {
    console.log(1);
});

new Promise(function(resolve,reject){
    console.log(5)
    resolve(2)
}).then(function(val){
    console.log(val);
})
// 执行结果 5 2 1
```
```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
// 执行结果 1768 2435 9 11 10 12
```
```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    //async2做出如下更改：
    new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
    });
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise3');
    resolve();
}).then(function() {
    console.log('promise4');
});

console.log('script end');
// 执行结果 
/*
script start
async1 start
promise1
promise3
script end
promise2
async1 end
promise4
setTimeout
*/
```
```js
async function async1() {
    console.log('async1 start');
    await async2();
    //更改如下：
    setTimeout(function() {
        console.log('setTimeout1')
    },0)
}
async function async2() {
    //更改如下：
	setTimeout(function() {
		console.log('setTimeout2')
	},0)
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout3');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
/*执行结果
script start
async1 start
promise1
script end
promise2
setTimeout3
setTimeout2
setTimeout1
*/
```
```js
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')
/*
运行结果
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
*/
```



----

**参考文献：**

- [阮一峰-什么是event loop](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
- [浏览器事件循环机制（event loop）](https://juejin.im/post/5afbc62151882542af04112d)
- [从一道题浅说 JavaScript 的事件循环](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)
- [js的事件循环是什么](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md#95-js-%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%98%AF%E4%BB%80%E4%B9%88)
- [JavaScript执行（一）：Promise里的代码为什么比setTimeout先执行？](https://time.geekbang.org/column/article/82764)
- [深入理解javascript中的事件循环event-loop](https://www.cnblogs.com/xiaohuochai/p/8527618.html#anchor4)

---