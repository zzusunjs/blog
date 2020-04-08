----

JavaScript 中数组的随机排序

----

示例

```c
输入：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
输出：[4, 6, 1, 3, 2, 5, 7, 8, 9, 0]
```

----

解题思路

A: 现在了解到的有三种方法。一种是将数组中的每个位置的元素都与一个随机的位置交换；第二种方法是调用数组的 `sort` 方法，传入一个随机返回正负值的比较函数；第三种是用`Math.random()` 产生一组随机序列，然后按照这个序列将数组中的元素`splice`, `push` 到别的数组去。

---

代码

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
JavaScript 实现 Fisher–Yates 洗牌算法

```js
var shuffleByFisherAndYates = function(nums){
    for(let i=nums.length; i; --i){
        let randomIndex = parseInt(Math.random() * i);
        [nums[i-1], nums[randomIndex]] = [nums[randomIndex], nums[i-1]];
    }
    return nums;
}
```

JavaScript 方法二： 使用数组的 sort 方法并，传入一个随机返回正负结果的比较函数。由于 sort 方法的实现，这种方式并不能达到一个真正的随机排列。 v8 在处理 sort 方法时，当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序和插入排序的混合排序。 当使用插入排序的时候，数组中末尾的元素被调整到数组前端的概率越来越小，因为需要比较并返回随机值得次数越多。

```javascript
var shuffleBySort = function(nums){
    nums.sort(()=>{ return Math.random() - 0.5});
    return nums;
}
```
JavaScript 方法三： 将数组中的元素按照某个随机序列提取到另一个 数组中去。

```javascript
var shuffleBySplice = function(nums){
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

评估

```js
var getShuffleResult = function(nums, shuffleFunction){

    let times = 10000;
    let res   = {};

    for(let i=0; i<times; ++i){
        let tmp = shuffleFunction(nums.concat());       // concat 深度复制一个数组
        let key = JSON.stringify(tmp);
        res[key] ? res[key]++ : res[key] = 1;
    }

    for(let key in res){
        res[key] = res[key] / times * 100 + '%';
    }

    return res;
}
```

<img src="pics\shuffle_result.png" style="zoom:50%;" />

----



参考文献

- [JavaScript 中使用 concat() 深度复制数组](https://segmentfault.com/q/1010000011850950)

- [ javascript 数组随机排序 ] (https://github.com/mqyqingfeng/Blog/issues/51 )

  

---