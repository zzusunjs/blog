<template>
    <div>
        <p>
            {{name}} 
            {{major}}
            {{city}}
        </p>
        <button @click="showName">显示姓名</button>
    </div>
</template>

<script>
import mixinExample from "./mixinExample.js"
export default {
    mixins: [mixinExample], // 可以添加多个 vue会自动合并
    // data methods mounted 这些将会和 mixInExample 之间的代码混合 mixin
    data(){
        return{
            name: 'SJS',
            major: 'web 前端',

        }
    },
    methods:{
    },
    mounted(){
        console.log("mixinDemo mounted", this.name);
    }
}
</script>