---
title: JavaScript 中的call 以及 apply
---

## 调用函数的一种方式

apply 和 call  在 JavaScript 中都是一种函数调用的方式。二者的作用相同，apply 和 call  的第一个参数指定了被调用函数体内 this 的指向，当传入 null  值得时候，函数体内 this 可以指向全局对象 或仍保持为 null (strict模式下)。

apply 接收两个参数，第一个为被调用函数体内 this 的指向，第二个为 数组或者 类数组， apply 将数组中的元素作为参数传递给被调用函数。当 apply 接收的数组长度小于 被调用函数的参数个数时，被调用函数最后的几个参数 为 undefined。

call  方法接收的参数个数不确定，第一个参数是被调用函数体内 this 的指向，后面参数为 将被 call 传递给 被调用函数。同样，当 call 方法接收的参数个数小于 被调用函数的参数个数时，被调用函数最后的几个参数为 undefined。

---

```js

var clientHello = function(initSequence, host){
   console.log(this.name + " want to link to " + host + ' with ' + initSequence);
}

var serverHello = function(initSequence, ack, ip){
    console.log(this.name + " respond to " + ip + 
    ' with initSequence ' + initSequence + " and ack " + ack
    );
}

var client = {
    name: 'Alice',
}

var server = {
    name : 'Bob',
}

clientHello.call(client, 1000, "100.100.100.100");   // call && apply 
serverHello.apply(server, [3000,1001, "1.1.1.1"]);

clientHello.call(client, "100.100.100.100");         // call apply 接收参数小于 被调用函数参数个数时 
serverHello.apply(server, [3000, "1.1.1.1"]);
```

### 手动实现 call 

```js
// 手动实现 call
Function.prototype.call2 = function(objContext){
    // context 即被调用函数中 this 的指向，可以理解为一个对象
    // this 为 调用 call2 函数的发起者，就是 被调用函数
    let context = objContext || window;
    context.tmp = this;

    let args = [];
    for(let i=1, bound=arguments.length; i<bound; ++i){
        args.push('arguments[' + i + ']');
    }
    // 使用eval 保证可以传入多个参数

    let res = eval('context.tmp(' + args + ')');
    delete context.tmp;
    return res;
}

var obj = {
    name: "alice",
}

var showName = function(a, b){
    console.log(this.name);
    return {
        a: a,
        b: b,
        sum: a + b,
    };
}
console.log(showName.call2(obj, 100, 200));
// alice
// {a: 100, b: 200, sum: 300}
```

### 手动实现 apply

```js
// 手动实现 apply
Function.prototype.apply2 = function(objContext, array){
    // objContext 为被调用函数 的 this 指向, array 为调用 apply2 时传入的数组参数
    let context = objContext || window;
    context.tmp = this;
    let res;
    if(array === null || array.length == 0){
        context.tmp();
    }else{
        let args = [];
        for(let i=0; i<array.length; ++i){
            args.push('array[' + i + ']');
        }
        res = eval('context.tmp(' + args + ')');
    }
    delete context.tmp;
    return res;
}

console.log(showName.apply2(obj, [1000, 2000]));
// alice
// {a: 1000, b: 2000, sum: 3000}
```

参考文献

- [call && apply]( https://juejin.im/entry/58d0a7b22f301e007e5a15ae )
- [call && apply 的手动实现](https://github.com/mqyqingfeng/Blog/issues/11 )

