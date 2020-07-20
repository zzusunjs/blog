

#### webpack 性能优化 - 产出代码



---

##### background

- 打包出的代码体积更小
- 合理分包，不重复加载
- 执行速度更快，内存使用更小

---

##### 途径

- 小图片 base64编码 （减少网络请求）

```js
{
    test: '/\.(png|jpg|jpeg|gif)$/',
    use : {
        loader: 'url-loader',
        options:{
            // 小于 5KB 的图片用 base64格式输出
            // 否则依然用file-loader的形式产出url格式
            limit: 5*1024,
            // 打包到 img目录下
            outputPath: '/img1/',
            // 设置图片的 cdn 地址
            publicPath: 'http://cdn.abs.com',
        }
    }
}
```

- bundle 文件加 hash `output中 filename:[name].[contentHash:8].js`

- 懒加载， import 语法

- 提取公共代码  

- IgnorePlugin 

- 使用 CDN 加速（1.配置cdn 前缀并打包，2.把打包后的结果上传到 cdn 服务器）

  webpack.prod.js 中 output 中 加入

  ```js
  publicPath: 'http://cdn.abs.com'
  // 修改所有静态资源的 url 前缀，加入上述域名
  ```

- 使用 production

- Scope Hosting

  