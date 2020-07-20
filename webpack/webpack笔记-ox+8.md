

#### webpack 要点总结

-  基本配置
  - 拆分配置和 merge
  - 启动本地服务 （要点之一， Proxy 代理）
  - 处理es6
  - 处理样式 （style loader css loader less loader 啥的）
  - 处理图片 （小图base64）
- 高级配置
  - 多入口
  - 抽离 css 文件
  - 抽离公共代码 （第三方库，自己的公共代码）
  - 懒加载 （import  语法，vue react 中的异步加载组件 异曲同工）
  - 处理 JSX
  - 处理 Vue 

- 优化打包效率
  - babel-loader
  - IgnorePlugin
  - noParse
  - happyPack
  - ParallelUglofyPlugin
  - 自动刷新，热更新，DllPlugin  (不可用于线上生产环境)
- 优化产出代码
  - 小图片 base64
  - budle 加 hash
  - 懒加载
  - 提取公共代码
  - 使用 CDN 加速
  - IgnorePlugin 
  - 使用 production  模式
  - Scope Hosting 
- 构建流程概述 （原理）
- babel 
  - 环境搭建-基本配置
  - babel-polyfill
  - babel-runtime