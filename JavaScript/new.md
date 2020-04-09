---
title: new 操作符的原理和实现
---

## new 操作符做了什么 ？

- 创建一个空对象
- 设置原型链
- 执行构造函数
- 判断构造函数的返回值类型，如果是值类型，返回创建的对象，否则返回构造函数的返回对象。

---

## 实现

```js

var newFunction = function(){

    let newObject = null,
    constructor = [].shift.call(arguments)
    constructorResult = null;

    if(typeof constructor !== 'function'){
        throw new Error("not function, can't be initialized"); 
    }else{
        // newObject = Object.create(constructor.prototype);
        newObject = new Object();
        newObject.__proto__ = constructor.prototype;
        constructorResult = constructor.apply(newObject, arguments);
        // initialize
        return typeof constructorResult === 'object' ? constructorResult : newObject;
    }
}

var constructorOne = function(name, age){
    this.name = name;
    this.age  = age;
    //return "what the heck";
    // return {
    //     id : '111',
    //     name: this.name,
    //     age : this.age, 
    // }
}

constructorOne.prototype.value = "are you ok ?";
constructorOne.prototype.sayHello = function(){
    console.log("hello, " + this.value);
}

var obj = newFunction(constructorOne, "alice", 18);
console.log(obj);
console.log(obj.value);   // undefined when constructorOne return object 
obj.sayHello();

/***************************************************** */

var another = new constructorOne("bob", 20);
console.log(another);
console.log(another.value);
another.sayHello();
```

<img src="\pics\new_result.png" width="500px" alt="运行结果">

---

参考文献

- [new 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13 )
- [模拟实现new]( [https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md#50-new-%E6%93%8D%E4%BD%9C%E7%AC%A6%E5%85%B7%E4%BD%93%E5%B9%B2%E4%BA%86%E4%BB%80%E4%B9%88%E5%91%A2%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md#50-new-操作符具体干了什么呢如何实现) )

