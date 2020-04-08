---
title: JavaScript 数组
---

## 遍历数组

### map() 方法

 map 方法对数组中的每一项调用回调函数，返回一个新数组。 map 函数将自动为 回调函数 传入 3 个参数，分别是 元素的值，元素的下标，元素所在的数组。另外我们还可以通过 map 函数传入 一个 回调函数内部使用的 this 的值。

```js
var classifier ={
    threshold: 60,
    classify: function(value, index, array){

        console.log("value ", value);
        console.log("index ", index);
        console.log("array ", array);    // array  (3) [100, 59, 99]
        console.log("this", this);       // this {threshold: 60, classify: ƒ}

        if(value < this.threshold){
            return 'Not Accept';
        }else{
            return 'Accept'
        }
    }
}

console.log([100, 59, 99].map(classifier.classify, classifier));
// ["Accept", "Not Accept", "Accept"]
console.log([100, 81, 49].map(Math.sqrt));
// [10, 9, 7]
```

---



参考文献

- [JavaScript Array MDN]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map )