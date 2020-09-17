class MyPromise {
    // new 一个 promise 对象的时候需要传入一个函数，而该函数有两个参数，resolve, reject。resolve 和 reject 都是JavaScript引擎提供的。
    constructor(executor){
        // status 有三个状态 pending, resolved, rejected

        this.status = 'pending';
        this.value  = undefined;
        // resolved 之后的数据
        this.reason = undefined;
        // rejected 的原因

        this.onRejectedCallBacks = [];
        this.onResolvedCallBacks = [];

        // 构造函数内 执行 executor 函数
        try{
            executor(this.myResolve, this.myReject);
        }catch(e){
            this.myReject(e);
        }
    }

    myResolve = (data) => {
        // promise 的状态仅能从 pending 变为 resolved 或者 rejected
        if(this.status === 'pending'){
            this.value = data;
            this.status = 'resolved';
            console.log("resolved with data ", data);
            this.onResolvedCallBacks.forEach(f => f());
        }
    }

    myReject = (reason) => {
        if(this.status === 'pending'){
            this.reason = reason;
            this.status = 'rejected';
            console.log("rejected with reason ", reason);
            this.onRejectedCallBacks.forEach(f => f());
        }
    }

    myThen(onFulFilled, onRejected){
        // 根据状态执行回调函数
        if(this.status === 'resolved'){
            onFulFilled(this.value);
        }
        if(this.status === 'rejected'){
            onRejected(this.reason);
        }
        // pending 状态并不执行 .then 方法而是先将方法存起来，pending 状态改变后再执行
        if(this.status === 'pending'){
            this.onRejectedCallBacks.push(()=>{
                onFulFilled(this.value);
            });
            this.onResolvedCallBacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

let myPromise = new MyPromise((myResolve, myReject) => {
   let i = Math.random() * 10;
   if(i > 1){
       setTimeout(()=> {
        myResolve('bigger than 5 after 2 seconds');
       }, 2000);
   }else{
       myReject('<= 5');
   }
});

myPromise.myThen((value)=>{
    console.log("promise success");
}, (reason) => {
    console.log("promise failed");
});

// let p = new Promise((resolve, reject) => {
//     // 异步操作
//     data = 'yibucaozuo';
//     if('success'){
//         // pending => fullied
//         resolve(data);
//     }else{
//         // pending => rejected ?
//         reject(data);
//     }
// });

// p.then((data) => {
//     // fullified 的 回调
// }).catch(err => {
//     // reject 的回调
// })

