<template>
    <div>
        <button @click="changeState('A')">A</button>
        <button @click="changeState('B')">B</button>
        <button @click="changeState('C')">C</button>

        <keep-alive>
            <keepAliveStateA v-if="state==='A'"></keepAliveStateA>
            <keepAliveStateB v-if="state==='B'"></keepAliveStateB>
            <keepAliveStateC v-if="state==='C'"></keepAliveStateC>
        </keep-alive>
        <!-- 注意观察控制台，使用 <keep-alive> 标签包裹之后就没有 destroy 了 -->
        <!-- 不同于 v-show, 一个通过 css 一个通过 Vue 框架 -->
        
    </div>
    
</template>
<script>
import keepAliveStateA from "./keepAliveStateA.vue";
import keepAliveStateB from "./keepAliveStateB.vue";
import keepAliveStateC from "./keepAliveStateC.vue";
export default {
    components:{
        keepAliveStateA,
        keepAliveStateB,
        keepAliveStateC
    },
    data(){
        return{
            state: 'A',
        }
    },
    methods:{
        changeState(val){
            this.state = val;
        }
    }
}
</script>