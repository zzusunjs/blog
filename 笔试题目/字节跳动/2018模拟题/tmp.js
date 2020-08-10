// 1. 函数开头没有判断边界值输入情况，如 data == null 或者 data.size() == 0 的情况应直接返回。

// 2. 函数中 if else 语句没有使用大括号包裹，不利于代码的可读性和维护。

// 3. 逻辑错误，在首次计算的 mid 就是最右侧的要查找的元素的下标时 不能满足题意。如  [1,2,3,3,4,4,5]。可修改为以下代码。
function binarySearchMax(data, target){

    if(!data || !Array.isArray(data) || data.length === 0){
        return -1;
    }


    let left = 0,
        right = data.length-1;
    while(left < right){
        let mid = parseInt((left + right) / 2);
        if(data[mid] < target){
            left = mid+1;
        }else{
            right = mid-1;
        }
    }

    if(data[right] === target){
        while(data[right] == target){
            right++
        }
        return --right;
    }

    return -1;
}

const array1 = [1,2,3,3,4,4,5];
const array2 = [1,1,1];
const array3 = [1];
console.log(binarySearchMax(array1, 3)); //3
console.log(binarySearchMax(array1, 4)); //5

console.log(binarySearchMax(array2, 1)) // 2
console.log(binarySearchMax(array3,1)) // 0
​
