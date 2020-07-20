#### webpack 基本配置

---

- 拆分配置 和 merge

  - webpack.common.js , webpack.dev.js, webpack.prod.js 

  - 通常将 webpack的配置拆分为三个文件，其中在 dev.js 和 prod.js 中引入 commom.js , 引入方式为 

    ```js
    const webpackCommonConf = require('./webpack.commom.js');
    const {smart} = require('webpack-merge');
    module.exports = smart(webpackCommonConf, {
        // 自己的配置
    });
    ```

  - 一个基本的 webpack.common.js

    ```js
    const path = require('path');
    const {srcPath, distPath } = require('./paths');
    //paths 为自定的 js 文件，保存了常用的文件路径
    
    module.exports = {
        entry: path.join(srcPath, 'index'),
        module:{
            rules: [
                {
                    
                }
            ],
        },
        plugins: {
            
        },
    }
    ```

    ```js
    // paths.js
    
    const path = require('path');
    
    const srcPath = path.join(__dirname, '..', 'src');
    const distPath = path.join(__dirname, '..', 'dist');
    
    module.exports = {
        srcPath,
        distPath
    }
    ```

    

