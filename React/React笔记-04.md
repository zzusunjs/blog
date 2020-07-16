



### 事件

---

- bind this
- event 参数
- 传递自定义参数

---

- 语法规范 onClick （ bind  this ）

  ```jsx
  constructor(){
      this.clickHandler = this.clickHandler.bind(this);
      // 就是这样，把clickHandler 中的this指定为 这个组件的 this
}
  <button onClick={this.clickHandler}>搞咩啊</button>
  // clickHandler is a function
  
  function clickHandler(){
      // 方法一
      // 注意这里用到了 this 需要在前面 bind this
      // 或者你在 绑定事件监听器的时候 bind this, 但是如果这样多次写的话就会执行多次 bind 方法, 最好还是只写一次可以带来性能的提升。 
      // this 默认的话是 undefined
      this.setState({name: 'WangEr'});
  }
  
  clickHandler2 = () => {
      this.setState({name: 'WangEr'});
      // 方法二，使用箭头函数，或者称为静态方法，此时的 this 指向函数被定义的地方。推荐使用。
  }
  ```
  

- React 中事件的 不同支持

  ```jsx
  render(){
      return <a href="https://www.imooc.com/" onCLick={this.clickHandler3}>click me</a>
  }
  
  clickHandler3 = (event) => {
      event.preventDefault();
      event.stopPropagation();
      // 阻止默认行为和 事件冒泡
      console.log('target ', event.target);
      // 指向当前元素，即触发事件的元素
      console.log('current target ', event.currentTarget); 
      // 指向当前元素，假象，指向 dom 元素。
      console.log(event);
      // 打印出来的结果, event 的原型是 sytheticEvent, 不是原生 event 
      // 对比 Vue 中的 event , 原生 event 的原型是 一个 MouseEvent
      console.log(event.nativeEvent);
      // 获取原生 event 
      
      
      // event 是 合成 的
      // event.nativeEvent 指向原生 event
      // 所有事件都被挂载到 document 上
      // 不同于 DOM 事件，也不同于 Vue 中的事件
  }
  ```

- 绑定事件时传参

  ```jsx
  <a href="www.bilibili.com" onClick={()=>{this.open('parmas')}}></a>
  
  open = (params) => {
      // some operation
  }
  ```

  