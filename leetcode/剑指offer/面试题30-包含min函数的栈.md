

---

**题意描述 && 示例：**

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

```js
示例:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

**提示：**

- 各函数的调用总次数不超过 20000 次

---

**代码 && 解题思路：**

```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.length = 0;
    this.data   = [];
    this.helper = [];                  // 使用两个栈分别存储数据和维护最小值
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(this.helper[this.length-1] < x){
        this.helper.push(this.helper[this.length-1]);
    }else{
        this.helper.push(x);
    }
    this.length += 1;
    this.data.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.helper.pop();
    this.length--;
    return this.data.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.data[this.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.helper[this.length-1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```

---

