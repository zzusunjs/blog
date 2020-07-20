

#### webpack 性能优化 - 产出代码 之 production



---

##### background

- 配置拆分后，在 webpack.prod.js 中 mode : ' production' 会**自动开启代码压缩**。(仅限于 webpack 4.x )
- Vue React 等会自动删除调试代码，（如开发环境的 warning，执行速度更快，体积更小）
- 自动 启用 Tree-Shaking - 将不需要的代码 在打包时 摇下来 。但是，必须用 es6 Module 才能让 tree shaking 生效，用 commonJS 不行。

---

