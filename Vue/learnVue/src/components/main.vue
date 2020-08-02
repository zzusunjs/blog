<template>
    <div id="mainBox">
        <p>This is main Componet</p>
        <AdvanceUse></AdvanceUse>
    </div>
</template>

<script>
import AdvanceUse from './AdvanceUse/index.vue';
export default {
    components:{
        AdvanceUse,
    },
    data(){
        return{

        }
    },

    mounted(){
        console.log("mainVue is mounted");
    },

    methods:{
       
    }
}
</script>

<style>
#mainBox{
    width: 100%;
    height: 100%;
    /* background-color: tomato; */
}
</style>