const compiler = require('vue-template-compiler');

// Vue 模板编译示例
// 插值
const template = `<p>{{message}}</p>`;
with (this) { return _c('p', [_v(_s(message))]) }
// this 就是 vm 实例 new Vue({})
// 类似于 h 函数
// -c => createElement => vnode
// -v => createTextVNode
// _s => toString
// _l => renerList


const template = `<p>{{flag ? message : 'nothing here'}}<p>`;
with (this) { return _c('p', [_v(_s(flag ? message : 'nothing here'))]) }


const template = `<div id="div1" class="box"><img :src="imageUrl"/></div>`;
with (this) {
    return _c('div', { staticClass: "box", attrs: { "id": "div1" } }, [
        _c('img', { attrs: { "src": imageUrl } })
    ])
}
// 编译

const template = `<div><p v-if="flag === a">A</p><p v-else>B</p></div>`;
with (this) { return _c('div', [(flag === a) ? _c('p', [_v("A")]) : _c('p', [_v("B")])]) }

const template = `<ul><li v-for="item in list" :key="item.id">{{item.title}}</ul>`;
with (this) {
    return _c('ul', _l((list),
        function (item) { return _c('li', { key: item.id }, [_v(_s(item.title))]) }), 0)
}

const template = `<button @click="clickHandler">submit</button>`;
with (this) { return _c('button', { on: { "click": clickHandler } }, [_v("submit")]) }

const template = `<input type="text" v-model="name">`;
with (this) {
    return _c('input', {
        directives: [{ name: "model", rawName: "v-model", value: (name), expression: "name" }],
        attrs: { "type": "text" },
        domProps: { "value": (name) },
        on: {
            "input": function ($event) {
                if ($event.target.composing) return;
                name = $event.target.value
            }
        }
    });
}


const res = compiler.compile(template);
console.log(res.render);


// 可以利用 run code 插件运行，也可以 node vueTemplateCompiler.js 运行