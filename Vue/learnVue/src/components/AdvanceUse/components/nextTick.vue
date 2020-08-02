<template>
    <div id="nextTickBox">
        <ul ref="ul1">
            <li v-for="(item, index) in list" :key="index">
                {{item}}
            </li>
        </ul>
        <button @click="addItem">添加一项</button>
        <button @click="addItemWithNextTick">添加一项 nextTick</button>
    </div>
</template>
<script>
export default {
    name: 'nextTickApp',
    data(){
        return{
            list: [
                'a',
                'b',
                'c',
            ]
        }
    },

    methods:{
        addItem(){
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);

            // 获取 dom ， 对应第三行的 refs="ul1"
            const ele = this.$refs.ul1;
            // 输出子元素的长度
            console.log(ele.childNodes.length);
            // vue 是异步渲染，此时 dom 中的 子节点还是原来的数量
        },
        addItemWithNextTick(){
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);

            // 1. 异步渲染，$nextTick 待dom 渲染完之后再回调
            // 2. 页面渲染时 会将 data 做整合， 多次 data 修改只会渲染一次 ，
            // 上述三次修改只触发一次 nextTick
            this.$nextTick( () => {
                const ele = this.$refs.ul1;
                console.log(ele.childNodes.length);
            });

        }
    }
}
</script>