<template>
    <div>
        <p>Vue 高级特性 </p>
        <hr>
        <!-- <p>{{name}}</p>
        <customVModel v-model="name"></customVModel> -->
        <!-- <input type="text" v-model="name"> -->
        <!-- input 和 vmodel 在一起是十分常用的, 但是 和组件在一起就是 不常见的高级特性了 -->

        <!-- <nextTick></nextTick> -->

        <!-- <slotDemo :url="website.url">
            {{website.title}}
        </slotDemo> -->

        <!-- <scopedSlotDemo :url="website.url"> -->
            <!-- {{website.title}} -->
            <!-- <template v-slot="slotProps">
                {{slotProps.slotData.title}} -->
                <!-- slotData 需要和 子组件中对应 -->
            <!-- </template>
        </scopedSlotDemo> -->

        <!-- <namedSlot>
            <template v-slot:header>
                <h1> 插入 header 插槽中 </h1>
            </template>

            <p>滚滚长江东逝水，插入到 main slot 中，即未命名的插槽</p>

            <template v-slot:footer>
                <h6> 插入 footer 插槽中 </h6>
            </template>
        </namedSlot> -->

        <!-- <component :is="componentName"></component> -->

        <!-- <div v-for="(item, index) in componentNameList" :key="index">
            <component :is="item"></component>
        </div> -->

        <!-- 异步组件 -->

        <!-- <nextTick v-if="showNextTick"></nextTick>
        <button @click="showNextTick=true">show nextTick </button> -->

        <!-- 缓存组件 -->
        <!-- <keepAlive></keepAlive> -->

        <!-- mixin 抽离公共逻辑 -->
        <mixinDemo></mixinDemo>



    </div>
</template>

<script>
import customVModel from "./components/customVModel.vue";
// import nextTick from "./components/nextTick.vue";
import slotDemo from "./components/slotDemo.vue";
import scopedSlotDemo from "./components/scopedSlotDemo.vue";
import namedSlot from "./components/namedSlot.vue";
import keepAlive from "./components/keepAlive.vue";
import mixinDemo from "./components/mixinDemo.vue";
export default {

    components:{
        customVModel,
        // nextTick,
        slotDemo,
        scopedSlotDemo,
        namedSlot,
        nextTick: () => import("./components/nextTick.vue"),
        keepAlive,
        mixinDemo,
    },
    data(){
        return {
            name: "SJS",
            website: {
                url: "http://imooc.com/",
                title: 'imooc',
                subTitle: '程序员梦工厂'
            },

            componentName: 'nextTick',

            componentNameList: [
                'text',
                'image',
                'text',
                'video',
            ],
            showNextTick: false,
        }
    },
}
</script>