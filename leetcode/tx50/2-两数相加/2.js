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

/**
 * 20200720 增加一种 简化写法
 * 
*/
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

    if(l1 === null && l2 !== null){
        return l2;
    }else if(l1 !== null && l2 === null){
        return l1;
    }else if(l1 === null && l2 === null){
        return null;
    }else{

        let head = new ListNode(0),
            current = head,
            head1 = l1,
            head2 = l2,
            carry = 0,
            value1 = 0,
            value2 = 0;

        while(head1 !== null || head2 !== null || carry !== 0){
            
            // 创建新的节点并指向它
            let node = new ListNode(0);
            current.next = node;
            current = current.next;

            if(head1){
                value1 = head1.val;
                head1 = head1.next;
            }else{
                value1 = 0;
            }

            if(head2){
                value2 = head2.val;
                head2 = head2.next;
            }else{
                value2 = 0;
            }

            current.val = (value1 + value2 + carry) % 10;
            carry = parseInt((value1 + value2 + carry) / 10);
        }
        return head.next;
    }
};