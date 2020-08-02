<template>
    <!--自定义v-model 的用途 例如 Vue 颜色选择器-->
    <input type="text" :value="text1" @input="$emit('change1', $event.target.value)">
    <!-- 1. 上面的 input 使用了动态属性 :value 而不是 v-model -->
    <!-- 2. 上面的 change1 和 model.event 中的事件要对应起来 -->
    <!-- 3. text1 属性需要对应起来  -->
</template>
<script>
export default {
    // 仅此而已
    model:{
        prop: 'text1', // 对应props 中的text 以及 value= text
        event: 'change1',// 对应 $emit 中分change 
    },
    props:{
        text1: String,
        default(){
            return '';
        }
    }
}
</script>