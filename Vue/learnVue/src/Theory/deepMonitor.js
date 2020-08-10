
// 视图更新函数
function updateView() {
    console.log("视图更新");
    // other code
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建一个原型为 oldArrayPrototype 的空对象
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach( methodName => {
    arrProto[methodName] = function(){
        updateView();
        // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments);
    }
});


function observer(data) {
    // 深度监听对象
    if (!data || typeof data !== 'object') {
        // 只监听对象或者数组
        return;
    }

    if(Array.isArray(data)){
        data.__proto__ = arrProto;
    }


    // 重新定义各个属性，for in 既可以遍历数组又可以遍历对象
    for (let key in data) {
        defineReactive(data, key, data[key]);
    }
}

function defineReactive(data, key, value) {

    // 深度监听需要递归
    observer(value);

    Object.defineProperty(data, key, {
        get: function () {
            console.log("getter" + value.toString());
            return value;
        },
        set: function (newValue) {
            // value 一直在闭包中 此处设置完之后再get 时也有值
            if (newValue !== value) {
                console.log("setter");
                value = newValue;
                updateView();
                observer(newValue);
            }
        }
    });
}




const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: 'hangzhou',
    },
    nums: [1,2,3,4]
}

observer(data);

// test
// data.name = 'WangEr';
// console.log("name: ", data.name);
// data.age  = 18;
// console.log("age ", data.age);

//深度监听
// data.info.address = "KF";
// console.log("address ", data.info.address);

// 新增属性监听不到
// data.newAttribute = "RUOK";
//delete data.name;

// 修改属性为对象也可以监听到
// data.name = {
//     firstName: 'S',
//     lastName: 'J',
// }
// console.log("firstName ", data.name.firstName);

data.nums.push(100);