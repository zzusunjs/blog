

React 基本使用

---

- 日常使用，必须掌握，面试必考送分题。
- 梳理知识点，从文档中找出考点和重点。
- 考察形式多样。

---

JSX 基本使用

- 变量，表达式
- class， style
- 子元素和组件

----

- 获取变量（Vue 中称为插值使用两个大括号 {{ }} ），使用单个大括号 { } 。大括号内可以写变量，JS 表达式等。如果想使用静态的值直接用双引号包裹即可。

- JSX 中 节点的类名需要写成 className，因为 class 是 ES6 中的关键字。

  ```jsx
  const ele = <p className="Hello">早上好</p>
  ```



-  Style 写法主要有

  + 将 Style 写成 JS 变量，然后用大括号包裹

    ```jsx
    const styleData = {fontSize: '14px', color: 'tomato'}
    const ele = <p style={styleData}>使用JS对象设置样式</p>
    ```

  + 内联写法，直接将 JS 对象字面量写在大括号中，看起来像是包了两层大括号。

    ```jsx
    const ele = <p style={{fontSize: '14px', color: 'tomato'}}>内联样式</p>
    ```

  + 静态 Style , 和 HTML 中的写法一直，style="font-size: 30px; color: tomato;"



- 使用原生 HTML 字符串

  ```jsx
  const rawHtml = '<span>富文本内容<i>斜体<i/><b>加粗</b></span>'；
  const rawHtmlData = {
      __html: rawHtml // 注意，必须写成这种形式
  }
  const rawHtmlElement = <div>
            				<p dangerouslySetInnerHTML={rawHtmlData}></p>
            				<p>{rawHtml}</p>
        				  </div>
  ```

- 加载组件，就像书写普通 HTML 标签一样即可。

