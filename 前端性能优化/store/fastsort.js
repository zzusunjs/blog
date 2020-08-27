

function sort(arr, left, right){
    /**arr: 待排序数组
     * /
     */
    if(!Array.isArray(arr) || arr.length === 0){
        return arr;
    }else{
        let 
            l = left,
            anchor = arr[l],
            r = right;
            console.log("a l r", anchor, left, right);
        while(l < r){
            while(r > l){
                if(arr[r] > anchor){
                    r--;
                }else{
                    // 右侧找到一个小于或等于 anchor 的元素
                    console.log("right search ", arr[r]);
                    arr[l] = arr[r];
                }
            }

            while(l < r){
                if(arr[l] <= anchor){
                    l ++;
                }else{
                    // 左侧找到一个大于 anchor 的元素
                    arr[r] = arr[l];
                }
            }
        }
        arr[r] = anchor;
        console.log(left, l, right);
        //sort(arr, left, l);
        sort(arr, l+1, right);
    }
    return arr;
} 


let arr = [1,3,2];
console.log(sort(arr, 0, 2));
