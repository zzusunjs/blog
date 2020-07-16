

### 组件使用

----

- props 传递数据
- props 传递函数 （不同于 vue）
- props 类型检查

---

- props 传值 && 类型检查

```jsx
// 子组件
const {list} = this.props; // 使用 es6 的解构赋值获取参数
this.props.list            // 或者直接使用 这个值
// 父组件
<List list={this.state.list}></List>
 
// 类型检查
List.propTypes = {
    list : PropTypes.arrayOf(PropTypes.object).isRequired
    // 接收一个 list , 类型必须为对象数组
    // 需要使用插件 xxxx , 增加代码健壮性, 简易说明需要传入的数据
}
```

- 传递函数

  ```jsx
  <Input submitActivity={this.onSubmitActivity}>
  <!--子组件触发, 并传入参数-->
  onSubmitActivity = (activity) => {
          this.setState({
              list : this.state.list.concat({
                  id: `id-$ {(new Date()).now()}`
                  activity,
              })
          })
      }
      
      
      
  // 状态提升, 将数据或者状态提升到多个组件中 最高层的组件, 给下层组件提供数据和 事件处理函数。
  ```

  