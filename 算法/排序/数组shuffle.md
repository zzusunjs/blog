---





---

**题意描述：**

 给定一个数组，随机打乱该数组中元素的排列顺序。



----



**示例：**

```c
输入：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
输出：[4, 6, 1, 3, 2, 5, 7, 8, 9, 0]
```

----

**解题思路：**

A: 现在了解到的有三种方法。一种是将数组中的每个位置的元素都与一个随机的位置交换；第二种方法是调用数组的 `sort` 方法，传入一个随机返回正负值的比较函数；第三种是用`Math.random()` 产生一组随机序列，然后按照这个序列将数组中的元素`splice`, `push` 到别的数组去。

---

**代码：**

JavaScript 方法一：将每个位置的元素与随机的一个位置交换。

```javascript
var shuffle = function(nums){
    for(let i=0; i<nums.length; ++i){
        randomIndex = parseInt(Math.random() * nums.length);
        swap(nums, i, randomIndex);
    }
}
var swap = function(nums, indexa, indexb){
    let tmp = nums[indexa];
    nums[indexa] = nums[indexb];
    nums[indexb] = tmp;
    return ;
}
```
JavaScript 方法二： 使用数组的 sort 方法并，传入一个随机返回正负结果的比较函数。

```javascript
var shuffle = function(nums){
    nums.sort((a, b)=>{
        return Math.random() - 0.5;
    });
}
```
JavaScript 方法三： 将数组中的元素按照某个随机序列提取到另一个 数组中去。

```javascript
var shuffle = function(nums){
    var shuffleResult = [];
    let bound = nums.length;
    for(let i=0; i<bound; ++i){
        let randomIndex = parseInt(Math.random() * (bound-i));
        let remove = nums.splice(randomIndex, 1);
        shuffleResult.push(remove[0]);
    }
    return shuffleResult;
}
```

---

**总结：**

- [JavaScript 中使用 concat() 深度复制数组](https://segmentfault.com/q/1010000011850950)

---