import React from 'react';
import ReactDom from 'react-dom';

// 箭头函数 es6语法，并不是所有浏览器都支持
// webpack 单独也处理不了 只能搞 es5
// webpack 怎么处理 html 
const App = () => {
    return (
        <div>
            <h1>React niuB</h1>
        </div>
    )
}

export default App
ReactDom.render(<App/>, document.getElementById('app'));