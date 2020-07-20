

#### es6 Module 和 CommonJS 



---

##### background

- ES6 Module 静态引入，编译时引入
- CommonJS 动态引入，执行时引入
- 只有静态引入 es6 Module 才能静态分析，才能实现 tree Shaking

```js
let apiList = require('../config/api.js');
if(isDev){
    // CommonJS 可以动态引入，执行时引入
    // 如果是ES6 Module 则 编译时报错，只能按照第一行的方式静态引入
    apiList = require('../config/api_dev.js');
}
```

