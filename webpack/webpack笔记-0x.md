



#### 热更新

---

- 自动刷新：整个网页全部刷新，速度较慢。状态丢失。
- 热更新： 新代码生效，网页不刷新，状态不丢失。路由，页面输入等也不丢失。

---

#### 具体实现

- 引入 webpack 插件 HotModuleReplacementPlugin (无需安装，该插件为webpack自带)
- webpack.dev.js 中修改 entry 
- webpack.dev.js 中 plugins 增加 实例
- devServer 中增加 hot: true
- 开启热更新之后需要在 index.js 中增加代码 配置 热更新监听的模块和相应的回调函数。在监听范围内的文件（代码）变化会触发热更新，其他范围内的文件还是自动刷新。

---

