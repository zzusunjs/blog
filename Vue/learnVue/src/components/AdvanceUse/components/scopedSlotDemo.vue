<template>
    <a :href="url">
        <slot :slotData="website">
            {{website.subTitle}}
            <!-- 默认内容，当父组件不设置内容的时候，这里才会显示。
            接收 外层节点 传递的子节点 -->
        </slot>
    </a>
</template>

<script>
export default {
    props: ['url'],
    data(){
        return{
            website:{
                url: 'http://www.bilibili.com',
                title: 'BiliBili 干杯',
                subTitle: '快来B站学习'
            }
        }
    }
}
</script>