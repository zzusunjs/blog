

----

**题意描述：**

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

---

**示例：**

```clike
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```
---


**解题思路：**

Alice: 好好的两个数直接加起来不就得了，为啥非要放到两个链表里面再加起来。
Bob: 这个，就像是大数加法啊，以前都是给两个字符串的，比如说有1000个字符组成的数字的字符串，现在放到链表里面也是一样的。
Alice: 那该怎么写 ？
Bob: 就直接从低位到高位，从右到左加起来呗，每次加的时候要记得进位，加到最后还要考虑是不是还有进位就好了。
Alice: 如果两个数的位数不一样怎么办 ？
Bob: 没关系，位数较短的就用 0 替代呗。
Alice: 😎😎



---

**代码：**

Python 方法一：大数加法
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:

        extra = 0
        head = ListNode(0)
        node = head

        while l1 != None or l2 != None or extra:

            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            l1   = l1.next if l1 else None
            l2   = l2.next if l2 else None

            node.val = (val1 + val2 + extra) % 10
            extra    = (val1 + val2 + extra) // 10

            if l1 == None and l2 == None and extra == 0:
                node.next = None
                break

            tmp  = ListNode(0)
            node.next = tmp
            node = tmp

        return head
```
Java 方法一：大数加法。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

        int extra = 0;
        int val1  = 0;
        int val2  = 0;

        ListNode head = new ListNode(0);
        ListNode node = head;

        while(l1 != null || l2 != null || extra != 0){

            if(l1 != null){
                val1 = l1.val;
                l1   = l1.next;
            }else{
                val1 = 0;
            }
            if(l2 != null){
                val2 = l2.val;
                l2   = l2.next;
            }else{
                val2 = 0;
            }

            node.val  = (val1 + val2 + extra) % 10;
            extra    = (val1 + val2 + extra) / 10;

            if(l1 == null && l2 == null && extra == 0){
                node.next = null;
                break;
            }

            ListNode tmp = new ListNode(0);
            node.next = tmp;
            node = tmp;

        }
        return head;
    }
}
```
JavaScript 方法一： 大数加法
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

    if(l1 === null){
        return l2;
    }
    if(l2 === null){
        return l1;
    }

    let head = new ListNode((l1.val + l2.val) % 10),
        pre = head,
        num1 = 0,
        num2 = 0,
        carry = parseInt((l1.val + l2.val) / 10);
        // 计算末尾数字

    l1 = l1.next;
    l2 = l2.next;

    while(l1 !== null || l2 !== null){

        if(l1 !== null){
            num1 = l1.val;
            l1 = l1.next;
        }else{
            num1 = 0;
        }

        if(l2 !== null){
            num2 = l2.val;
            l2 = l2.next;
        }else{
            num2 = 0;
        }

        let tmp = num1 + num2 + carry,
            node = new ListNode(tmp % 10);
            carry = parseInt(tmp / 10);

        pre.next = node;
        pre = node;
    }

    if(carry !== 0){
        node = new ListNode(carry);
        pre.next = node;
    }
    // 最后的进位

    return head;
};
```



---


**易错点：**

- 一些测试点：

```clike
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
[5,6,4]
[2, 4, 3]
[5, 6, 4]
[2]
[9,9,9]
[1,1]
[9,9]
[9]
[0]
[9]
[9]
[1,8]
[0]
[5]
[5]
```
- 答案：

```clike
[6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
[7,0,8]
[1,0,0,1]
[0,1,1]
[9]
[8,1]
[1,8]
[0,1]
```

---


**总结：**

- 大数加法 是 计算机编程竞赛入门级别的题目哦。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200121171648934.png#pic_center)

----