---
title: 一课全面掌握主流布局-笔记-02
---

##### 三列布局

- 定义，一般情况下指的是左边两列是确定的宽度，右边一列是自动填充剩余所有空间的一种布局效果。

- 实现方式

  - float + margin 
  - float + overflow
  - display 属性的 table 相关值使用

  ```css
  	<style>
          .parent{
              width: 100%;
              height: 200px;
  
              display: table;
              /* 第三种解决方案需要使用一个div 包裹所有的子元素 */
          }
  
          .left, .center, .right{
              height: 200px;
              display: table-cell;
          }
  
          .left{
              /* 定宽 */
              width: 200px;
              background-color: #cccccc;
              /* float: left; */
  
          }
          .center{
              width: 300px;
              background-color: tomato;
              /* float: left; */
          }
          .right{
              background-color: teal;
  
              /* margin-left: 500px; */
              /* 第二种方案，左侧两个仍然是float */
              /* overflow:hidder 生成一个bfc 去除float 的影响 */
              /* overflow: hidden; */
  
          }
      </style>
  
  	<div class="parent">
          <div class="left">
              left
          </div>
          <div class="center">
              center
          </div>
          <div class="right">
              right
          </div>
      </div>
  ```

  <img src="./pics/threeColumns.png">



##### 圣杯布局

<img src="./pics/shengbei.png" width=500>

- 一般认为是三行三列布局，名称来源于该布局效果类似圣杯。三行就是三个 div, 难点就是三列，就是 定宽 + 自适应 + 定宽的实现。

- 圣杯布局主要是实现中间主体部分中的左右定宽 + 中间自适应的布局效果。

- 实现方式

  - margin + float

    - 优点，简单易用

    - 缺点，center 位于页面靠后的位置，搜索引擎在解析页面的时候需要比较多的时间才能解析到，不易于搜索引擎优化。

      ```css
      	<style>
              .parent{
                  width: 100%;
                  height: 200px;
              }
              .left, .right, .center{
                  height: 200px;
              }
      
              .left{
                  width: 200px;
                  background-color: #cccccc;
      
                  float: left;
              }
              .center{
                  background-color: tomato;
      
                  margin-left: 200px;
                  margin-right: 200px;
              }
              .right{
                  width: 200px;
                  background-color: teal;
      
                  float: right;
              }
          </style>
      
      <!-- right 位于 center 之前是因为，浮动的元素无法占据非浮动元素在一行中剩余的位置，而非浮动的元素则可以占据浮动的元素在一行中剩余的位置。如果按照 left, center, right的方式去做，right会保存在下一行 -->
      
          <div class="parent">
              <div class="left">
                  左侧定宽
              </div>
              <div class="right">
                  右侧定宽
              </div>
              <div class="center">
                  中间自适应
              </div>
          </div>
      ```

      <img src="./pics/shengbei-floatAndMargin.png">

  - 三个元素全浮动，父容器margin 留出位置，定宽元素通过 margin负值和 定位移动到指定位置。

    - 优点

    - 缺点，总宽度过小时，

      ```css
      	.parent {
                  height: 200px;
                  width: auto;
                  /* 这里不要再写 width:100% 会出问题 */
                  /* 数值耦合，留出左右的位置 */
                  margin-left: 200px;
                  margin-right: 200px;
              }
      
              .left,
              .right,
              .center {
                  height: 200px;
                  float: left;
              }
      
              .center {
                  background-color: tomato;
                  width: 100%;
              }
      
              .left {
                  width: 200px;
                  background-color: #cccccc;
      
                  /* 移动到上一行 */
                  margin-left: -100%;
      
                  /*有 position 才可以使用定位，relative 不会脱离文档流，更容易控制*/
                  /* 移动到指定位置 */
                  position: relative;
                  left: -200px;
              }
      
              .right {
                  width: 200px;
                  background-color: teal;
      
                  margin-left: -200px;
                  position: relative;
                  /* right: -200px; */
                  left: 200px;
              }
      
      	<div class="parent">
              <!-- center 位于最前，加速解析，有利于seo -->
              <div class="center">
                  中间自适应
              </div>
              <div class="left">
                  左侧定宽
              </div>
              <div class="right">
                  右侧定宽
              </div>
          </div>
      ```

      <img src="./pics/shengbei-floatAndMarginAndPosition.png">

  ##### 双飞翼布局

  - 定义，双飞翼布局最早由淘宝团队提出，是针对圣杯布局的优化解决方案，主要是优化了圣杯布局中开启定位的问题。

  - 优点，解决了圣杯布局中开启 定位的问题

    ```css
    	.parent{
                height: 200px;
            }
    
            .left, .center, .right{
                float: left;
                height: 200px;
            }
    
            .center{
                width: 100%;
                background-color:cornflowerblue;
            }
    
            .inner{
                height: 200px;
                background-color: teal;
    
                margin:0 200px;
            }
    
            .left{
                width: 200px;
                background-color: #cccccc;
    
                margin-left: -100%;
            }
    
            .right{
                width: 200px;
                background-color: tomato;
    
                margin-left: -200px;
               
            }
    
    
    	<div class="parent">
            <div class="center">
                <div class="inner">
                    parent 内有
                    center 浮动 内有
                    inner 左右外边距
                    
                </div>
            </div>
            <div class="left">
                左侧定宽，浮动，负外边距
            </div>
            <div class="right">
                右侧定宽，浮动，负外边距
            </div>
        </div>
    ```

    <img src="./pics/shuangfeiyi.png">

    

 

