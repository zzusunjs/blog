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
