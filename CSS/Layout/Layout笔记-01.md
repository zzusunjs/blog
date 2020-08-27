---
title: 一课全面掌握主流布局-笔记
---

##### 什么是布局 ？

简单来说就是 html 页面的整体结构或者骨架，类似于传统的报纸或者杂志中的排版。

布局不是某个具体的技术内容，而是一种设计思想。



##### 什么是居中布局

- 元素在页面中呈现居中效果
  - 水平居中，元素距离页面左端和右端的水平距离完全相同
  - 垂直居中，元素距离页面上部和下部的垂直距离完全相同
- 分类
  - 水平居中布局
  - 垂直居中布局
  - 居中布局（水平 + 垂直）



##### 水平居中布局

- 水平居中布局就是指当前元素在父级元素容器中，水平方向是居中显示的（废话）

- 实现方式

  - inline-block +text-align 属性配合使用

    - 优点，浏览器兼容性好
    - 缺点，text-align 属性具有继承性，导致子元素的文本也是居中显示的

    ```css
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>水平居中布局</title>
        <style>
            .parent{
                width: 100%;
                height: 200px;
                background-color: #cccccc;
    
                text-align: center;
                /* text-align 是为文本内容设置对齐方式
                   left 左对齐
                   center 居中对齐
                   right 右对齐
                 */
            }
            .child{
                width: 200px;
                height: 200px;
                background-color:pink;
    
                /* display 属性
                block 块级元素
                inline 行内元素, width 和 height 属性无效, 所以必须是 inline-block 而不能是inline 
                (text-align属性对于行内元素有效)
                inline-block 行内块级元素, width height 有效(块级+内联) */
    
                display: inline-block;
                text-align: left;
                /* 设置子元素的对其方式，默认会继承上一级的 text-align:center */
                
            }
        </style>
    </head>
    <body>
        <div class="parent">
            <div class="child">
                文本
            </div>
        </div>
    </body>
    </html>
    ```

    <img src="./pics/text-align.png">

    

  - table + margin 属性配合使用

    - 父元素只需设置宽高，背景色即可。
    - 优点，只需要对子级元素设置就可以实现水平方向的居中效果。
    - 缺点，如果子级元素脱离文档流，会导致 margin 属性值无效。
      - 脱离文档流的方式
        - float  （浮动）
        - absolute （绝对定位）
        - fixed (固定定位)

    ```css
    	.child{
                display: table;
                /* display: block; */
                /* display: inline; */
                /* table 和 block 都可以，但是inline 不行，无法设置宽度 */
                margin: 0 auto;
    
                /* margin属性, 外边距 
                一个值，表示上下左右
                两个值，第一个表示上下，第二个表示左右
                三个值，第一个表示上，第二个表示左右，第三个表示下
                四个值，表示上右下左
                margin: 0 auto 表示上下边距为 0, 左右边距为 auto
                ,即浏览器自动等分。
                */
    
                width: 200px;
                height: 200px;
                background-color: blue;
    
            }
    ```

    <img src="./pics/margin0auto.png">

    

  - absolute + transform 属性配合使用

```css

```





