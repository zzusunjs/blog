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
