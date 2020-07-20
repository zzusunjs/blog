

#### webpack 优化构建速度 



---

##### 可用于生产环境

- 优化 babel-loader ( 缓存，include exclude )
- IgnorePlugin 
- noParse
- happyPack
- ParallelUglifyPlugin (压缩代码，一般仅用于生产环境)



---

##### 不可用于生产环境

- 自动刷新
- 热更新 （万万不可）
- DllPlugin

---



