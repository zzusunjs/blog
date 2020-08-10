function reactive(target = {}) {

    if (typeof target !== 'object' || target == null) {
        // 不是对象或者数组，直接返回
        return target;
    }

    // 代理配置
    const proxyConf = {

        get(target, key, receiver) {
            // target: 原生的data 
            // key : key
            // reveiver : 其实是 proxyData
            // Reflect.ownKeys([1,2,3]) ==> ["0", "1", "2", "length"]
            // Reflect.ownKeys({a: 10, b: 20}) ==> ["a", "b"]

            // 只处理非原型的属性
            const ownKeys = Reflect.ownKeys(target);
            if (ownKeys.includes(key)) {
                console.log('get', key);
                // 监听
            }
            const result = Reflect.get(target, key, receiver);

            return reactive(result);
            // 深度监听
            // 性能提升在于 只有要 get info 的时候 才会触发 更深层级的监听
            // 返回get 结果
        },

        set(target, key, val, receiver) {

            // 重复修改不处理
            const oldValue = target[key];
            if (val === oldValue) {
                return true;
            }

            // 监听新增的属性
            const ownKeys = Reflect.ownKeys(target);
            if(!ownKeys.includes(key)){
                console.log("new property ", key);
            }

            
            const result = Reflect.set(target, key, val, receiver)
            console.log('set', key, val);
            console.log("set result ", result);
            // 返回设置成功的意义在于有些对象可以被 defineProperty 为 不可修改的
            return result;
            // 是否设置成功
        },

        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key);
            console.log("delete property ", key);
            console.log("delete result ", result);
            return result;
            // 是否删除成功
        }

    }

    // 生成代理对象
    const observed = new Proxy(target, proxyConf);
    return observed;
}

// 测试数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        city: 'BJ',
        a: {
            b:{
                c:{
                    d: 'RUOK'
                }
            }
        }
    }
}

const proxyData = reactive(data);