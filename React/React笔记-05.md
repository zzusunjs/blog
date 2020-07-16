

### 表单

---

- 受控组件
- input textaraa select 中的 value
- checkbox radio 中的 checked

---

```jsx
class FormDemo extends React.Component{
    constructor(props){
        this.state = {
            name: 'alice',
            info: 'Hello',
            gender: 'female'，
            city: 'hangzhou',
            flag: true,
        }
    }
    
    render(){
        // 受控组件, input 和 state 中的name 关联起来了。这样的话, input 的值就可以通过 state 来控制。 
        return <div>
                  <p>{this.state.name}</p>
            	  <label htmlFor="inputName">姓名: </label>
            	  <!--使用 htmlFor 代替 for-->
                  <input id="inputName" value={this.state.name} onChange={this.onInputChanges}>
               </div>
    }
    <!-- textArea 的使用 类似于 input 标签, 请注意需要使用 value 属性, 省略 -->
    <!-- select 的使用也十分相似, 略去-->
    <!-- radio 的属性 为 checked , 绑定事件也是 onChage , 其余一致  -->
            
    onInputChange = (e) => {
                this.setState({
                    name: e.target.value;s
                });
            }
}
```

