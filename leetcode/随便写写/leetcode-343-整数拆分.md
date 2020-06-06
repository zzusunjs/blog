

---

**题意描述：**

 给定一个正整数 *n*，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。 

---

**示例：**

```js
示例 1:

输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。

示例 2:

输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

---

**解题思路：**

Alice: 这道题是动态规划，关键是要利用已有的计算结果。dp[n] 表示 整数 n 拆分的最大乘机。dp[n+1] = max(dp[i] * dp[n+1-i]) 然后 i 的大小是从 2 到 n+1 / 2

Bob： 不是可以分成多份吗 ？ 怎么就分了两份？

Alice: 分成多份那是个幌子，看第二个例子吧。dp[6] 等于多少，等于 9。

Bob: 我明白了，如果可以分成 k 个数连乘的形式，一定可以改写成 2 个数的乘积，而且还对应了某个小于 n 的数的最大拆分乘积。

Alice：对，就是这样，还需要注意的一点就是 算乘积的时候，如果 dp[i] < i, 那就直接乘 i,不必再做拆分了。

Bob: 不错不错。   

---

**代码：**

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
    let dp = new Array(n);
    dp[2] = 1;
    dp[3] = 2;
    dp[4] = 4;
    dp[5] = 6;
    dp[6] = 9;
    for(let i=7; i<=n; ++i){
        let maxValue = 0,
            tmp = 0,
            a = 0,
            b = 0;
        for(let j=2; j<parseInt(i/2); ++j){
            a = j > dp[j] ? j : dp[j];
            b = i-j > dp[i-j] ? i-j : dp[i-j];
            tmp = a * b;
            if(tmp > maxValue){
                maxValue = tmp;
            }
        }
        dp[i] = maxValue;
    } 
    return dp[n];
};
```



---

**易错点：**

```js
// 输入
2
3
8
10
58
// 输出
1
2
18
36
1549681956
```



---

**总结：**

- [原题链接](https://leetcode-cn.com/problems/integer-break/)

---

