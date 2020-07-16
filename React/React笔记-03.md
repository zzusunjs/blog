

## 条件判断 && 列表渲染

---

### 条件判断

---

- if else
- 三元表达式
- 逻辑运算符 && ||

---

- if else 与 普通 JavaScript  代码完全一致

- 三元表达式

  ```jsx
  <p className={this.state.status === 'someStatus' ? 'ValueA' : 'ValueB'}> 无需多讲 </p>
  ```

- && || 还是 JS 中的那一套，对于 && 如果直接判定第一个表达式为真，则返回第二个表达式，如果判定第一个表达式为假则直接返回。对于 || 如果第一个表达式为真，则直接返回真，否则返回第二个表达式。与其他语言十分不同。

---

### 列表渲染

---

- map 和 key

  ```jsx
  this.state = {
      users: [
          {
              name: 'xiaoming',
              age: 18,
              gender: 'male'
          },
          {
              name: 'xiaowang',
              age: 18,
              gender: 'male'
          },
          {
              name: 'alice',
              age: 18,
              gender: 'female'
          },
      ]
  }
  
  // map 是 JavaScript 数组的原型方法，可以查 MDN 文档，返回新数组， 原数组不变。
  
  render(){
      return (<ul>
              {this.state.users.map((item, idx) => {
                  return <li key={item.name}>{item.name}</li>
              })}
              </ul>);
  }
  <!--key 和 Vue 中的作用一样，必填，不能是 index 或者 random -->
  <!-- 此处可类比 Vue 中的 v-for -->
  ```

  



