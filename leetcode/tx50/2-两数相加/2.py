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